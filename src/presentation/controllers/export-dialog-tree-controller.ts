import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'
import { ListWorkspaceDialogNodes, getTreeLastNode, getNodesToExport, updateTargetWorkspaceDialogTree } from '../helpers/index'

export async function updateWorkspaceDialogTree (parentNodeId: string, nodesPagination: number, treeLastNodeId: string): Promise<any> {
  try {
    const targetNodesList = await new ListWorkspaceDialogNodes().targetWorkspace(nodesPagination)
    const sourceNodesList = await new ListWorkspaceDialogNodes().sourceWorkspace(nodesPagination)

    const parentNode: DialogNode = sourceNodesList.find((node: DialogNode) => node.dialog_node === parentNodeId)

    if (!sourceNodesList.includes(parentNode)) {
      return badRequest(new Error('Parent node does not exist in source workspace.'))
    }

    const nodesToExportList: DialogNode[] = await getNodesToExport(parentNodeId, sourceNodesList, targetNodesList)
    const treeLastNode: DialogNode = getTreeLastNode(treeLastNodeId, targetNodesList)

    return await updateTargetWorkspaceDialogTree(targetNodesList, treeLastNode, parentNode, nodesToExportList)
  } catch (Error) {
    return badRequest(Error)
  }
}
