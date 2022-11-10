import { createTargetAssistantV1 } from '../../helpers/workspace/create-assistant'
import { WATSON_TARGET_WORKSPACE_ID } from '../../config/index'
import { badRequest, sucessResponse } from '../../helpers/http-helper'
import { DialogNode } from 'ibm-watson/assistant/v1'
import { generateRandomId } from '../../helpers/generate-id'

export async function createNode (dialogNodeData: DialogNode): Promise<any> {
  try {
    const params = {
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      dialogNode: `node_${generateRandomId()}`,
      ...dialogNodeData
    }
    return await createTargetAssistantV1
      .createDialogNode(params)
      .then(createDialogNodeResponse => {
        return sucessResponse({
          message: createDialogNodeResponse.result
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
