import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'

export function changePreviousSibling (parentNode: DialogNode, targetNodeList: DialogNode[], lastNode?: DialogNode): any {
  try {
    const targetNodePreviousSibling = targetNodeList.find(node => node.dialog_node === parentNode.previous_sibling)
    if (targetNodePreviousSibling !== undefined) {
      const newDialogTree: DialogNode[] = []
      const targetNodeNextSibling = targetNodeList.find(node => node.previous_sibling === targetNodePreviousSibling?.dialog_node)
      targetNodeNextSibling.previous_sibling = parentNode.dialog_node
      targetNodeList.forEach(targetNode => {
        if (targetNode.dialog_node !== targetNodeNextSibling.dialog_node) {
          return newDialogTree.push(targetNode)
        }
      })
      return newDialogTree
    }
    parentNode.previous_sibling = lastNode?.previous_sibling
    lastNode.previous_sibling = parentNode?.dialog_node
  } catch (Error) {
    return badRequest(Error)
  }
}
