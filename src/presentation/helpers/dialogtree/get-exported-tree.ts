import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'
import { getNodeTree } from './get-node-tree'
import { deleteUndefinedJump } from './delete-undefined-jump'
import { getJumpsFromDialogTree } from './get-jumps-from-dialog-tree'
import { rollback } from '../../controllers/rollback-controller'

export async function getNodesToExport (parentNodeId: string, sourceNodesList: DialogNode[], targetNodesList: DialogNode[]): Promise<any> {
  try {
    const parentNode = sourceNodesList.find(node => {
      return node.dialog_node === parentNodeId
    })

    const dialogNodesToExport = (await deleteUndefinedJump(getNodeTree(parentNodeId, sourceNodesList).concat(parentNode), targetNodesList))
    const dialogNodesToExportIds = dialogNodesToExport.map(node => node.dialog_node)
    const jumpsFromDialogTreeToExportedNodes: DialogNode[] = await getJumpsFromDialogTree(dialogNodesToExportIds, sourceNodesList)
    const ResponseNodesThatJumpsToExportedNodes = jumpsFromDialogTreeToExportedNodes.filter(node => node.type === 'response_condition')

    ResponseNodesThatJumpsToExportedNodes.map(async responseNode => {
      if (targetNodesList.map(node => node.dialog_node).includes(responseNode.dialog_node)) {
        await rollback(responseNode.dialog_node).then(() => {
          dialogNodesToExport.push(responseNode)
        })
      }
    })

    return dialogNodesToExport.concat(ResponseNodesThatJumpsToExportedNodes)
  } catch (Error) {
    return badRequest(Error)
  }
}
