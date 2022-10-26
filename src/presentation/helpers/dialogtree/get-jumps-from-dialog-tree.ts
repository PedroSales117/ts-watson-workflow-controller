import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from '../http-helper'

export async function getJumpsFromDialogTree (nodesId: string[], dialogNodes: DialogNode[]): Promise<any> {
  try {
    const nodesWithJumps: any[] = []
    dialogNodes.forEach((node: DialogNode) => {
      if (node?.next_step?.behavior === 'jump_to' && nodesId.includes(node.next_step.dialog_node)) {
        return nodesWithJumps.push({
          jump_details: {
            to: node.next_step?.dialog_node,
            from: {
              title: node.title,
              id: node.dialog_node
            }
          }
        })
      }
    })
    return nodesWithJumps
  } catch (Error) {
    return badRequest(Error)
  }
}
