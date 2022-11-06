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
      .then((validateJumpResponse: any) => {
        return response.status(validateJumpResponse.statusCode).json({
          status: validateJumpResponse.statusCode,
          body: validateJumpResponse.body
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
