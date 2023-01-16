import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'

export function changeParent (flowFirstNode: DialogNode, targetNodeList: DialogNode[]): any {
  try {
    const targetNodeParent = targetNodeList.find(node => node.dialog_node === flowFirstNode.parent)

    if (targetNodeParent !== undefined || targetNodeParent !== null) {
      flowFirstNode.parent = targetNodeParent.dialog_node
      return flowFirstNode
    }

    return flowFirstNode
  } catch (Error) {
    return badRequest(Error)
  }
}
