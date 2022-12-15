import { createTargetAssistantV1 } from '../../helpers/workspace/create-assistant'
import { WATSON_TARGET_WORKSPACE_ID } from '../../config/index'
import { badRequest, sucessResponse } from '../../helpers/http-helper'

export async function updateIntent (attributeToModifyName: string, intentName: string, toModifyData: any): Promise<any> {
  try {
    const params = {
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      intent: intentName,
      [attributeToModifyName]: toModifyData
    }

    return await createTargetAssistantV1
      .updateIntent(params)
      .then(updateIntentResponse => {
        return sucessResponse({
          intent: updateIntentResponse.result.intent,
          updatedTimeStamp: updateIntentResponse.result.updated
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
