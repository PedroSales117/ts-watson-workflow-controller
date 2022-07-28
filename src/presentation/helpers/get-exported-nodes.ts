import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'

export function getExportedNodes (sourceNodesList: DialogNode[]): any {
  try {
    return sourceNodesList?.filter((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[export]')
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
