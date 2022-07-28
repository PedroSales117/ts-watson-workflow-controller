import { badRequest } from '../helpers/http-helper'
import { updateWorkspaceDialogTree } from './create-new-dialog-tree'

export async function addNewDialogTreeToWorkspace (): Promise<any> {
  try {
    return await updateWorkspaceDialogTree()
      .then((response) => {
        return response
      })
  } catch (Error) {
    return badRequest(Error)
  }
}
