import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'
import { ListWorkspaceDialogNodes, getImportNode, getNodesToExport, updateTargetWorkspaceDialogTree } from '../helpers/index'

export async function updateWorkspaceDialogTree (parentNodeId: string, nodesPagination: number, importNodeId: string): Promise<any> {
  try {
    const targetNodesList = await new ListWorkspaceDialogNodes().targetWorkspace(nodesPagination)
    const sourceNodesList = await new ListWorkspaceDialogNodes().sourceWorkspace(nodesPagination)

    const importNode: any = getImportNode(importNodeId, targetNodesList)
    const nodesToExportList: any[] = getNodesToExport(parentNodeId, sourceNodesList)

    const entryPointNode = nodesToExportList.find((node: DialogNode) => node.dialog_node === parentNodeId)

    return await updateTargetWorkspaceDialogTree(targetNodesList, importNode, entryPointNode, nodesToExportList)
  } catch (Error) {
    return badRequest(Error)
  }
}
