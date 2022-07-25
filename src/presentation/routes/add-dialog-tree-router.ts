import { router } from '../config/express.config'
import { addNewDialogTreeToWorkspace } from '../controllers/add-new-dialog-tree'

export const createDialogTreeRouter = router

createDialogTreeRouter.post('/add', (request, response) => {
  try {
    void addNewDialogTreeToWorkspace().then((addNewDialogTreeToWorkspaceResponse: any) => {
      return response.status(addNewDialogTreeToWorkspaceResponse.statusCode).json({
        status: addNewDialogTreeToWorkspaceResponse.statusCode,
        body: addNewDialogTreeToWorkspaceResponse.body.message
      })
    })
  } catch (error) {
    return error
  }
})
