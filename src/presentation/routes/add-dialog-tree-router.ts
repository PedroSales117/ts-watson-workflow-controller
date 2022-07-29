import { router } from '../config/express.config'
import { addNewDialogTreeToWorkspace } from '../helpers/add-dialog-tree'

export const createDialogTreeRouter = router

createDialogTreeRouter.post('/add', (request, response) => {
  try {
    void addNewDialogTreeToWorkspace().then((addNewDialogTreeToWorkspaceResponse: any) => {
      return response.status(addNewDialogTreeToWorkspaceResponse.statusCode).json({
        status: addNewDialogTreeToWorkspaceResponse.statusCode,
        body: addNewDialogTreeToWorkspaceResponse.body.message
      })
    })
  } catch (createDialogTreeRouterError) {
    return createDialogTreeRouterError
  }
})
