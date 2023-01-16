import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'

export function getTreeLastNode (treeLastNode: string, targetNodesList: DialogNode[]): any {
  try {
    return targetNodesList?.find((node: DialogNode) => {
      return node?.dialog_node === treeLastNode
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
