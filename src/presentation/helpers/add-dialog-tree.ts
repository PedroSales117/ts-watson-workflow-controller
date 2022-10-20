import { badRequest } from './http-helper'
import { updateWorkspaceDialogTree } from '../controllers/create-new-dialog-tree'

export async function addNewDialogTreeToWorkspace (parentNodeId: string, importNodeId: string): Promise<any> {
  try {
    return await updateWorkspaceDialogTree(parentNodeId, 100000, importNodeId)
      .then((response) => {
        return response
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
