import { router } from '../../config/express.config'
import { MissingParamError } from '../../errors'
import { addNewDialogTreeToWorkspace } from '../../helpers/dialogtree/add-dialog-tree'
import { badRequest } from '../../helpers/http-helper'

export const createDialogTreeRouter = router

createDialogTreeRouter.post('/add', (request, response) => {
  try {
    interface requiredFieldsInterface {
      parentNodeId: string
      importNodeId: string
    }

    const { parentNodeId, importNodeId }: requiredFieldsInterface = request.body
    const requiredFields = ['parentNodeId']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          error: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void addNewDialogTreeToWorkspace(parentNodeId, importNodeId)
      .then((addNewDialogTreeToWorkspaceResponse: any) => {
        return response.status(addNewDialogTreeToWorkspaceResponse.statusCode).json({
          status: addNewDialogTreeToWorkspaceResponse.statusCode,
          body: addNewDialogTreeToWorkspaceResponse.body.message
        })
      })
  } catch (createDialogTreeRouterError) {
    return createDialogTreeRouterError
  }
})
