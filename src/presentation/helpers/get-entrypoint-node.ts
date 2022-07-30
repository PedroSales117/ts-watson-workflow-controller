import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from './http-helper'

export function getEntryPointNode (sourceNodesList: DialogNode[]): any {
  try {
    const entryPointNode = sourceNodesList?.find((node: DialogNode) => {
      return node?.title?.toLowerCase().includes('[entrypoint]')
    })
    return JSON.parse(JSON.stringify(entryPointNode).replace('[ENTRYPOINT]', ''))
  } catch (Error) {
    return badRequest(Error)
  }
}
