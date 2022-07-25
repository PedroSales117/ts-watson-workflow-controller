import { updateWorkspaceDialogTree } from './update-dialog-tree'

export async function addNewDialogTreeToWorkspace (): Promise<void> {
  try {
    return await updateWorkspaceDialogTree()
      .then((updateWorkspaceDialogTreeResponse) => {
        return updateWorkspaceDialogTreeResponse
      })
  } catch (addNewDialogTreeToWorkspaceError) {
    return addNewDialogTreeToWorkspaceError
  }
}
