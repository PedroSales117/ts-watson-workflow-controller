import { updateWorkspaceDialogTree, getTargetWorkspaceDialogTree } from './create-assistant'

export async function addNewDialogTreeToWorkspace (): Promise<void> {
  try {
    const getWorkspaceDialogTreeResponse: any = await getTargetWorkspaceDialogTree().then(async (workspaceDialogTree: any) => {
      return await updateWorkspaceDialogTree(workspaceDialogTree).then((updateWorkspaceDialogTreeResponse) => {
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
