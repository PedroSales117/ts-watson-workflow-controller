import AssistantV1 from 'ibm-watson/assistant/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import { WATSON_SERVICE_URL, WATSON_API_KEY, WATSON_ASSISTANT_TARGET_WORKSPACE_ID, WATSON_ASSISTANT_SOURCE_WORKSPACE_ID } from '../config/index'

const createAssistantV1 = new AssistantV1({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: WATSON_API_KEY
  }),
  serviceUrl: WATSON_SERVICE_URL
})

export async function getTargetWorkspaceDialogTree (): Promise<any> {
  try {
    return await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID
    })
  } catch (listDialogNodesError) {
    return listDialogNodesError
  }
}

export async function updateWorkspaceDialogTree (targetWorkspaceDialogTree: any): Promise<any> {
  try {
    const sourceNodesList: any = await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_SOURCE_WORKSPACE_ID
    }).then(nodesToExportResponse => {
      return nodesToExportResponse.result.dialog_nodes
    })

    const importNode: any = targetWorkspaceDialogTree?.result?.dialog_nodes?.find((node: any) => {
      return node?.title?.toLowerCase().includes('import')
    })

    if (!importNode) {
      return {
        status: 400,
        error: 'Bad Request',
        message: 'Import node not found'
      }
    }

    const entryPointNode: any = sourceNodesList?.find((node: any) => {
      return node?.title?.toLowerCase().includes('entrypoint')
    })

    if (!entryPointNode) {
      return {
        status: 400,
        error: 'Bad Request',
        message: 'Entry point node required'
      }
    }

    const nodesToExport = await sourceNodesList.filter((node: any) => {
      return node?.title?.toLowerCase().includes('export')
    })

    if (!nodesToExport) {
      return {
        status: 400,
        error: 'Bad Request',
        message: 'Export nodes required'
      }
    }

    /// ------------Sets the entry point's previous_sibling with the node id of last node------ ///
    entryPointNode.previous_sibling = importNode?.dialog_node

    return await createAssistantV1.updateWorkspace({
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID,
      dialogNodes: targetWorkspaceDialogTree.result.dialog_nodes.concat(entryPointNode, nodesToExport)
    })
      .then(updateWorkspaceResponse => {
        return updateWorkspaceResponse
      })
  } catch (updateWorkspaceError) {
    return updateWorkspaceError
  }
}
