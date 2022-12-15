import { MissingParamError } from '../../../errors'
import { router } from '../../../config/express.config'
import { badRequest } from '../../../helpers/http-helper'
import { updateIntent } from '../../../controllers/workspace/update-intent-controller'

export const updateIntentRouter = router

updateIntentRouter.post('/updateIntent', (request, response) => {
  try {
    const { attributeToModifyName, toModifyData, intentName } = request.body
    const requiredParams = ['attributeToModifyName', 'toModifyData', 'intentName']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void updateIntent(attributeToModifyName, intentName, toModifyData)
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
