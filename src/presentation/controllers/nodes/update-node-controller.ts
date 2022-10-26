import { createTargetAssistantV1 } from '../../helpers/workspace/create-assistant'
import { WATSON_TARGET_WORKSPACE_ID } from '../../config/index'
import { badRequest, sucessResponse } from '../../helpers/http-helper'

export async function updateNode (attributeName: any, toModifyData: any, dialogNodeId: any): Promise<any> {
  try {
    const params = {
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      dialogNode: dialogNodeId,
      [attributeName]: toModifyData
    }
    return await createTargetAssistantV1
      .updateDialogNode(params)
      .then(updateDialogNodeResponse => {
        return sucessResponse({
          modified_data: {
            node_id: updateDialogNodeResponse.result.dialog_node,
            title: updateDialogNodeResponse.result.title
          }
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
