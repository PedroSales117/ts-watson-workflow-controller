import { MissingParamError } from '../errors'
import { router } from '../config/express.config'
import { badRequest } from '../helpers/http-helper'
import { updateNode } from '../helpers/update-dialog-node'

export const updateDialogNodeRouter = router

updateDialogNodeRouter.post('/update', (request, response) => {
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

    void updateNode(attributeToModifyName, toModifyData, dialogNodeId).then((updateDialogNodeResponse: any) => {
      return response.status(updateDialogNodeResponse.statusCode).json({
        status: updateDialogNodeResponse.statusCode,
        body: updateDialogNodeResponse.body.message
      })
    })
  } catch (createDialogTreeRouterError) {
    return createDialogTreeRouterError
  }
})
