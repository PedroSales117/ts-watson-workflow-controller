import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'

export function getImportNode (targetNodesList: DialogNode[]): any {
  try {
    return targetNodesList?.find((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[import]')
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
