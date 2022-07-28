import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'

export function getEntryPointNode (sourceNodesList: DialogNode[]): any {
  try {
    return sourceNodesList?.find((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[entrypoint]')
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
