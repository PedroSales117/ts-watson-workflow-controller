import { createAssistantV1 } from './assistant'
import { WATSON_ASSISTANT_TARGET_WORKSPACE_ID } from '../config/index'
import { badRequest, sucessResponse } from './http-helper'

export async function updateNode (attributeName: any, toModifyData: any, dialogNodeId: any): Promise<any> {
  try {
    const params = {
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID,
      dialogNode: dialogNodeId,
      [attributeName]: toModifyData
    }
    return await createAssistantV1.updateDialogNode(params).then(updateDialogNoderesponse => {
      return sucessResponse({
        modified_data: {
          node_id: updateDialogNoderesponse.result.dialog_node,
          title: updateDialogNoderesponse.result.title
        }
      })
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
