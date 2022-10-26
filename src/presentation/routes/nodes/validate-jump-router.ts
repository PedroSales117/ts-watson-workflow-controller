import { MissingParamError } from '../../errors'
import { router } from '../../config/express.config'
import { badRequest } from '../../helpers/http-helper'
import { validateJump } from '../../controllers/nodes/validate-node-jump-controller'

export const validateJumpRouter = router

validateJumpRouter.get('/jumps', (request, response) => {
  try {
    const { dialogNodesId } = request.body
    const requiredParams = ['dialogNodesId']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void validateJump(dialogNodesId)
      .then((updateDialogNodeResponse: any) => {
        return response.status(updateDialogNodeResponse.statusCode).json({
          status: updateDialogNodeResponse.statusCode,
          body: updateDialogNodeResponse.body
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
