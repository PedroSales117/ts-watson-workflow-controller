import { createTargetAssistantV1 } from '../../helpers/workspace/create-assistant'
import { WATSON_TARGET_WORKSPACE_ID } from '../../config/index'
import { badRequest, sucessResponse } from '../../helpers/http-helper'

export async function updateEntity (attributeToModifyName: string, entityName: string, toModifyData: any): Promise<any> {
  try {
    const params = {
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      entity: entityName,
      [attributeToModifyName]: toModifyData
    }

    return await createTargetAssistantV1
      .updateEntity(params)
      .then(updateEntityResponse => {
        return sucessResponse({
          intent: updateEntityResponse.result.entity,
          updatedTimeStamp: updateEntityResponse.result.updated
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
