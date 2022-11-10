import { MissingParamError } from '../../errors'
import { router } from '../../config/express.config'
import { badRequest } from '../../helpers/http-helper'
import { deleteNode } from '../../controllers/nodes/delete-controller'

export const deleteRouter = router

deleteRouter.delete('/delete', (request, response) => {
  try {
    const { dialogNodeId } = request.body
    const requiredParams = ['dialogNodeId']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void deleteNode(dialogNodeId)
      .then((deleteDialogNodeResponse: any) => {
        return response.status(deleteDialogNodeResponse.statusCode).json(deleteDialogNodeResponse)
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
