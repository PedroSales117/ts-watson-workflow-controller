import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'

export function changeParent (dialogNode: DialogNode, targetNodeList: DialogNode[]): any {
  try {
    const targetNodeParent = targetNodeList.find(node => node.dialog_node === dialogNode.parent)

    if (targetNodeParent !== undefined || targetNodeParent !== null) {
      dialogNode.parent = targetNodeParent.dialog_node
      return dialogNode
    }

    return dialogNode
  } catch (Error) {
    return badRequest(Error)
  }
}
