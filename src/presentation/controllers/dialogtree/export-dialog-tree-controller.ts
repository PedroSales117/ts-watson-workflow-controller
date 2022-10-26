import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../../helpers/http-helper'
import { ListWorkspaceDialogNodes, getImportNode, getNodesToExport, updateTargetWorkspaceDialogTree } from '../../helpers/index'

export async function updateWorkspaceDialogTree (parentNodeId: string, nodesPagination: number, importNodeId: string): Promise<any> {
  try {
    const targetNodesList = await new ListWorkspaceDialogNodes().targetWorkspace(nodesPagination)
    const sourceNodesList = await new ListWorkspaceDialogNodes().sourceWorkspace(nodesPagination)

    const entryPointNode: DialogNode = sourceNodesList.find((node: DialogNode) => node.dialog_node === parentNodeId)

    if (!sourceNodesList.includes(entryPointNode)) {
      return badRequest(new Error('Parent node does not exist in source workspace.'))
    }

    const nodesToExportList: DialogNode[] = await getNodesToExport(parentNodeId, sourceNodesList)
    const importNode: DialogNode = getImportNode(importNodeId, targetNodesList)

    return await updateTargetWorkspaceDialogTree(targetNodesList, importNode, entryPointNode, nodesToExportList)
  } catch (Error) {
    return badRequest(Error)
  }
}
