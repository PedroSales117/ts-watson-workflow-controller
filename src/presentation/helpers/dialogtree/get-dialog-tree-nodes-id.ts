import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'
import { getNodeTree } from './get-dialog-tree'

export function getDialogTreeNodesId (nodesId: string[], dialogNodes: DialogNode[]): any {
  try {
    const dialogTree: any[] = []
    const parentNodes = dialogNodes.filter((node: DialogNode) => nodesId.includes(node.dialog_node))
    nodesId.forEach((nodeId: string) => {
      dialogTree.push(getNodeTree(nodeId, dialogNodes).concat(parentNodes))
    })
    const dialogTreeNodesId = dialogTree.flat(Infinity).map((node: DialogNode) => node.dialog_node)
    return dialogTreeNodesId
  } catch (Error) {
    return badRequest(Error)
  }
}
