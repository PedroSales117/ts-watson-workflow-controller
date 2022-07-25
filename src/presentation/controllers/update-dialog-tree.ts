import { DialogNode } from 'ibm-watson/assistant/v1'
import { MissingWorkspaceParamError } from '../errors'
import { createAssistantV1 } from '../helpers/assistant'
import { badRequest, sucessResponse } from '../helpers/http-helper'
import { WATSON_ASSISTANT_TARGET_WORKSPACE_ID, WATSON_ASSISTANT_SOURCE_WORKSPACE_ID } from '../config/index'

export async function updateWorkspaceDialogTree (): Promise<any> {
  try {
    const targetNodesList: DialogNode[] = await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID
    }).then(nodesToExportResponse => {
      return nodesToExportResponse?.result?.dialog_nodes
    })

    const sourceNodesList: DialogNode[] = await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_SOURCE_WORKSPACE_ID
    }).then(nodesToExportResponse => {
      return nodesToExportResponse?.result?.dialog_nodes
    })

    const importNode: DialogNode = targetNodesList?.find((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[import]')
    })

    const entryPointNode: DialogNode = sourceNodesList?.find((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[entrypoint]')
    })

    const nodesToExport = sourceNodesList?.filter((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[export]')
    })

    if (!importNode) {
      return badRequest(new MissingWorkspaceParamError('[import]'))
    }
    if (!entryPointNode) {
      return badRequest(new MissingWorkspaceParamError('[entryPointNode]'))
    }
    if (!nodesToExport) {
      return badRequest(new MissingWorkspaceParamError('[nodesToExport]'))
    }

    /// ------------Sets the entry point's previous_sibling with the node id of target workspace last node------ ///
    entryPointNode.previous_sibling = importNode?.dialog_node

    const updateWorkspaceResponse = await createAssistantV1.updateWorkspace({
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID,
      dialogNodes: targetNodesList.concat(entryPointNode, nodesToExport)
    })
      .then(updateWorkspaceResponse => {
        return sucessResponse({ message: `nodes add to workspace: ${updateWorkspaceResponse?.result?.name}` })
      })

    return updateWorkspaceResponse
  } catch (Error) {
    return badRequest(Error)
  }
}
