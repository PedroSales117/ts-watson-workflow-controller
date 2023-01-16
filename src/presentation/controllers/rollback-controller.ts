import { createTargetAssistantV1 } from '../helpers/workspace/create-assistant'
import { WATSON_TARGET_WORKSPACE_ID } from '../config/index'
import { badRequest, sucessResponse } from '../helpers/http-helper'

export async function rollback (dialogNodeId: string): Promise<any> {
  try {
    const params = {
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      dialogNode: dialogNodeId
    }
    return await createTargetAssistantV1
      .deleteDialogNode(params)
      .then(() => {
        return sucessResponse({
          message: 'Rollback occurred successfully.'
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
