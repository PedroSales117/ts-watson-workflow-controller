import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'

export function getImportNode (importNodeId: string, targetNodesList: DialogNode[]): any {
  try {
    return targetNodesList?.find((node: DialogNode) => {
      return node?.dialog_node === importNodeId
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
