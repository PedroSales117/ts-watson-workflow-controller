import AssistantV1 from 'ibm-watson/assistant/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import { WATSON_SERVICE_URL, WATSON_API_KEY, WATSON_ASSISTANT_WORKSPACE } from '../config/index'

export const createAssistantV1 = new AssistantV1({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: WATSON_API_KEY
  }),
  serviceUrl: WATSON_SERVICE_URL
})

export async function getWorkspaceDialogTree (): Promise<any> {
  try {
    return await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_WORKSPACE
    })
  } catch (listDialogNodesError) {
    return listDialogNodesError
  }
}

export async function updateWorkspaceDialogTree (workspaceDialogTree: any, newDialogTree: any, entryPointNode: any): Promise<any> {
  try {
    const lastNode: any = workspaceDialogTree?.result?.dialog_nodes?.find((node: any) => {
      return node?.title?.toLowerCase().includes('lastnode')
    })

    if (!lastNode) {
      return {
        status: 400,
        error: 'Bad Request',
        message: 'Last node not found'
      }
    }

    /// ------------Sets the entry point's previous_sibling with the node id of last node------ ///
    entryPointNode.previous_sibling = lastNode?.dialog_node

    return await createAssistantV1.updateWorkspace({
      workspaceId: WATSON_ASSISTANT_WORKSPACE,
      dialogNodes: workspaceDialogTree.result.dialog_nodes.concat(newDialogTree)
    }).then(updateWorkspaceResponse => {
      return updateWorkspaceResponse
    })
  } catch (updateWorkspaceError) {
    return updateWorkspaceError
  }
}
