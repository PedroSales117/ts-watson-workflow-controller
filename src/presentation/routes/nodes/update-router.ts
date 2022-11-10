import { MissingParamError } from '../../errors'
import { router } from '../../config/express.config'
import { badRequest } from '../../helpers/http-helper'
import { updateNode } from '../../controllers/nodes/update-controller'

export const updateRouter = router

updateRouter.post('/update', (request, response) => {
  try {
    const { attributeToModifyName, toModifyData, dialogNodeId } = request.body
    const requiredParams = ['attributeToModifyName', 'toModifyData', 'dialogNodeId']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void updateNode(attributeToModifyName, toModifyData, dialogNodeId)
      .then((updateNodeResponse: any) => {
        return response.status(updateNodeResponse.statusCode).json({
          status: updateNodeResponse.statusCode,
          body: updateNodeResponse.body.message
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
