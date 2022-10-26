import { WATSON_TARGET_WORKSPACE_ID } from '../../config/index'
import { badRequest, notFoundError, sucessResponse } from '../../helpers/http-helper'
import { createTargetAssistantV1 } from '../../helpers/workspace/create-assistant'
import { getDialogTreeNodesId } from '../../helpers/dialogtree/get-dialog-tree-nodes-id'
import { getJumpsFromDialogTree } from '../../helpers/dialogtree/get-jumps-from-dialog-tree'

export async function validateJump (nodesId: string): Promise<any> {
  try {
    const dialogNodes = await createTargetAssistantV1.listDialogNodes({ workspaceId: WATSON_TARGET_WORKSPACE_ID, pageLimit: 100000 })
      .then(response => {
        return response.result.dialog_nodes
      })

    const parentNodesId = nodesId.trim().split(',')
    const dialogTreeNodesId: string[] = getDialogTreeNodesId(parentNodesId, dialogNodes)
    const dialogTreeJumpsDetails = await getJumpsFromDialogTree(dialogTreeNodesId, dialogNodes)

    if (dialogTreeJumpsDetails < 1) {
      return notFoundError({
        message: 'Nenhum nó dentro da árvore recebe jumps.'
      })
    }

    return sucessResponse(dialogTreeJumpsDetails)
  } catch (Error) {
    badRequest(Error)
  }
}
