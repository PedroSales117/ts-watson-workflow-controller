import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'
import { getNodeTree } from './get-dialog-tree'
import { deleteUndefinedJump } from './delete-undefined-jump'

export async function getNodesToExport (parentNodeId: string, sourceNodesList: DialogNode[]): Promise<any> {
  try {
    const parentNode = sourceNodesList.find(node => {
      return node.dialog_node === parentNodeId
    })

    const dialogNodes = getNodeTree(parentNodeId, sourceNodesList).concat(parentNode)

    return await deleteUndefinedJump(dialogNodes)
  } catch (Error) {
    return badRequest(Error)
  }
}
