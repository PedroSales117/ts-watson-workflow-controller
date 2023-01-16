import { DialogNode } from 'ibm-watson/assistant/v1'
import { WATSON_TARGET_WORKSPACE_ID } from '../../config'
import { MissingWorkspaceParamError } from '../../errors'
import { createTargetAssistantV1 } from './create-assistant'
import { changePreviousSibling } from '../dialogtree/change-previous-sibling'
import { badRequest, sucessResponse } from '../http-helper'

export async function updateTargetWorkspaceDialogTree (targetNodesList: DialogNode[], treeLastNode: DialogNode, flowFirstNode: DialogNode, nodesToExportList: DialogNode[]): Promise<any> {
  try {
    if (!flowFirstNode) {
      return badRequest(new MissingWorkspaceParamError('[parentNode]'))
    }

    if (!nodesToExportList) {
      return badRequest(new MissingWorkspaceParamError('[nodesToExport]'))
    }

    changePreviousSibling(flowFirstNode, targetNodesList, treeLastNode)

    const dialogTreeToExport = targetNodesList.concat(nodesToExportList)

    return await createTargetAssistantV1.updateWorkspace({
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      dialogNodes: dialogTreeToExport
    })
      .then(response => {
        return sucessResponse({
          message: `nodes add to workspace: ${response?.result?.name}`
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
