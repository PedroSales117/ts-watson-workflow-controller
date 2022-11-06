import { MissingParamError } from '../../errors'
import { router } from '../../config/express.config'
import { badRequest } from '../../helpers/http-helper'
import { createNode } from '../../controllers/nodes/create-node-controller'

export const createRouter = router

createRouter.post('/create', (request, response) => {
  try {
    const { dialogNodeData } = request.body
    const requiredParams = ['dialogNodeData']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void createNode(dialogNodeData)
      .then((createNodeResponse: any) => {
        return response.status(createNodeResponse.statusCode).json({
          status: createNodeResponse.statusCode,
          body: createNodeResponse.body.message
        })
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
