import { router } from '../config/express.config'
import { DialogNode } from 'ibm-watson/assistant/v1'
import { addNewDialogTreeToWorkspace } from '../controllers/add-new-dialog'

export const createDialogTreeRouter = router

createDialogTreeRouter.post('/add', (request, response) => {
  try {
    const { newDialogTree } = request.body
    const entryPointNode: DialogNode = newDialogTree?.find((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('entrypoint')
    })

    if (!entryPointNode) {
      return response.status(400).json({
        error: 'Bad Request',
        message: 'Entry point node required',
        status: 400
      })
    }
    void addNewDialogTreeToWorkspace(newDialogTree, entryPointNode).then((addNewDialogTreeToWorkspaceResponse: any) => {
      return response.status(addNewDialogTreeToWorkspaceResponse.status).json(addNewDialogTreeToWorkspaceResponse)
    })
  } catch (error) {
    return error
  }
})
