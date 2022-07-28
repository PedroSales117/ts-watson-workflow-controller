import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../helpers/http-helper'

export function getMultipleResponseNodes (sourceNodesList: DialogNode[], nodesToExportList: DialogNode[]): any {
  try {
    return sourceNodesList?.filter((multipleResponseToExport: DialogNode) => {
      return multipleResponseToExport?.type === 'response_condition' && nodesToExportList.map(nodeIdToExport => nodeIdToExport?.dialog_node).includes(multipleResponseToExport?.parent)
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
