import { DialogNode } from 'ibm-watson/assistant/v1'
import { getChildrensNodes } from './get-children-nodes'

export function getNodeTree (nodeId: string, dialogNodes: DialogNode[]): DialogNode[] {
  let childrenNodes: DialogNode[] = []
  let nodesToEvaluate: DialogNode[] = getChildrensNodes(nodeId, dialogNodes)
  let newChildrens: DialogNode[] = []

  while (nodesToEvaluate.length > 0) {
    newChildrens = []

    for (const node of nodesToEvaluate) {
      newChildrens = [...newChildrens, ...getChildrensNodes(node.dialog_node, dialogNodes)]
    }

    childrenNodes = [...childrenNodes, ...nodesToEvaluate]
    nodesToEvaluate = [...newChildrens]
  }
  return childrenNodes
}
