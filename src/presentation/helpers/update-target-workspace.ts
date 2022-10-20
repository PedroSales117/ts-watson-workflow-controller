import { DialogNode } from 'ibm-watson/assistant/v1'
import { WATSON_ASSISTANT_TARGET_WORKSPACE_ID } from '../config'
import { MissingWorkspaceParamError } from '../errors'
import { createAssistantV1 } from './assistant'
import { changePreviousSibling } from './change-previous-sibling'
import { badRequest, sucessResponse } from './http-helper'

export async function updateTargetWorkspaceDialogTree (targetNodesList: DialogNode[], importNode: DialogNode, entryPointNode: DialogNode, nodesToExportList: DialogNode[]): Promise<any> {
  try {
    if (!importNode) {
      return badRequest(new MissingWorkspaceParamError('[import]'))
    }

    if (!entryPointNode) {
      return badRequest(new MissingWorkspaceParamError('[entryPointNode]'))
    }

    if (!nodesToExportList) {
      return badRequest(new MissingWorkspaceParamError('[nodesToExport]'))
    }

    changePreviousSibling(entryPointNode, importNode)

    const dialogTreeToExport = targetNodesList.concat(nodesToExportList)

    return await createAssistantV1.updateWorkspace({
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID,
      dialogNodes: dialogTreeToExport
    }).then(response => {
      return sucessResponse({ message: `nodes add to workspace: ${response?.result?.name}` })
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
