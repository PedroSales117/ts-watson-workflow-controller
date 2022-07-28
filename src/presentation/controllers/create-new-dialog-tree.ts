import { badRequest, sucessResponse } from '../helpers/http-helper'
import { ListWorkspaceDialogNodes, getImportNode, getEntryPointNode, getExportedNodes, getMultipleResponseNodes, updateTargetWorkspaceDialogTree } from '../helpers/index'

export async function updateWorkspaceDialogTree (): Promise<any> {
  try {
    const targetNodesList = await new ListWorkspaceDialogNodes().targetWorkspace(100000)
    const sourceNodesList = await new ListWorkspaceDialogNodes().sourceWorkspace(100000)
    const importNode = getImportNode(targetNodesList)
    const entryPointNode = getEntryPointNode(sourceNodesList)
    const nodesToExportList = getExportedNodes(sourceNodesList)
    const multipleConditionedResponseList = getMultipleResponseNodes(sourceNodesList, nodesToExportList)

    return await updateTargetWorkspaceDialogTree(targetNodesList, importNode, entryPointNode, nodesToExportList, multipleConditionedResponseList).then(response => {
      return sucessResponse({ message: `nodes add to workspace: ${response?.result?.name}` })
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
