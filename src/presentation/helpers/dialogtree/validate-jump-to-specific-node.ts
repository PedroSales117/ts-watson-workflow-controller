import { badRequest, notFoundError, sucessResponse } from '../http-helper'
import { ListWorkspaceDialogNodes } from '../dialogtree/list-dialog-nodes'
import { getNodeTree } from './get-node-tree'

export async function validateJumpToSpecificNode (fromDialogNodeId: string, toDialogNodeId: string): Promise<any> {
  try {
    void new ListWorkspaceDialogNodes().targetWorkspace(10000).then(dialogNodes => {
      const dialogTreeToValidate = getNodeTree(fromDialogNodeId, dialogNodes)
      const jumps = []

      dialogTreeToValidate.forEach(nodeToValidate => {
        if (nodeToValidate.next_step.dialog_node === toDialogNodeId) {
          jumps.push({
            dialogNode: nodeToValidate
          })
        }
      })

      if (jumps.length < 0) {
        return notFoundError({
          valid: false,
          message: `None node from ${fromDialogNodeId} makes any jump to ${toDialogNodeId}.`
        })
      }
      return sucessResponse({
        valid: true,
        jumps
      })
    })
  } catch (Error) {
    return badRequest(Error)
  }
}
