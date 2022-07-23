import { updateWorkspaceDialogTree, getWorkspaceDialogTree } from './create-assistant'

export async function addNewDialogTreeToWorkspace (newDialogTree: any, entryPointNode: any): Promise<void> {
  try {
    const getWorkspaceDialogTreeResponse: any = await getWorkspaceDialogTree().then(async (workspaceDialogTree) => {
      return await updateWorkspaceDialogTree(workspaceDialogTree, newDialogTree, entryPointNode).then((updateWorkspaceDialogTreeResponse) => {
        if (updateWorkspaceDialogTreeResponse.status !== 200) {
          return {
            status: updateWorkspaceDialogTreeResponse.status,
            error: updateWorkspaceDialogTreeResponse.message,
            message: updateWorkspaceDialogTreeResponse.statusText
          }
        }
        return {
          status: updateWorkspaceDialogTreeResponse.status,
          statusText: updateWorkspaceDialogTreeResponse.statusText,
          body: `Nodes sucessful add to workspace ${updateWorkspaceDialogTreeResponse.result.name}`
        }
      })
    })
    return getWorkspaceDialogTreeResponse
  } catch (addNewDialogTreeToWorkspaceError) {
    return addNewDialogTreeToWorkspaceError
  }
}
