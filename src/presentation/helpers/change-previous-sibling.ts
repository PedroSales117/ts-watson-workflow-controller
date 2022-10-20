import { DialogNode } from 'ibm-watson/assistant/v1'

export function changePreviousSibling (parentNode: DialogNode, lastNode: DialogNode): void {
  parentNode.previous_sibling = lastNode?.previous_sibling
  lastNode.previous_sibling = parentNode?.dialog_node
}
