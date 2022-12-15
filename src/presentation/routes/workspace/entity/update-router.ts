import { MissingParamError } from '../../../errors'
import { router } from '../../../config/express.config'
import { badRequest } from '../../../helpers/http-helper'
import { updateEntity } from '../../../controllers/workspace/update-entity-controller'

export const updateEntityRouter = router

updateEntityRouter.post('/updateEntity', (request, response) => {
  try {
    const { attributeToModifyName, toModifyData, entityName } = request.body
    const requiredParams = ['attributeToModifyName', 'toModifyData', 'entityName']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void updateEntity(attributeToModifyName, entityName, toModifyData)
      .then((updateIntentResponse: any) => {
        return response.status(updateIntentResponse.statusCode).json({
          status: updateIntentResponse.statusCode,
          body: updateIntentResponse.body.message
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
