import { router } from '../config/express.config'
import { addNewDialogTreeToWorkspace } from '../controllers/add-new-dialog'

export const createDialogTreeRouter = router

createDialogTreeRouter.post('/add', (request, response) => {
  try {
    void addNewDialogTreeToWorkspace().then((addNewDialogTreeToWorkspaceResponse: any) => {
      return response.status(addNewDialogTreeToWorkspaceResponse.status).json(addNewDialogTreeToWorkspaceResponse)
    })
  } catch (error) {
    return error
  }
})
