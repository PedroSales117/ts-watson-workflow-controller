/* eslint-disable array-callback-return */
import { DialogNode } from 'ibm-watson/assistant/v1'
import { badRequest } from './http-helper'

export function getNodesToExport (parentNodeId: string, sourceNodesList: DialogNode[]): any {
  try {
    const parentNode = sourceNodesList.find(node => {
      return node.dialog_node === parentNodeId
    })

    return getNodeTree(parentNodeId, sourceNodesList).concat(parentNode)
  } catch (Error) {
    return badRequest(Error)
  }
}

function getNodeTree (nodeId: string, dialogNodes: any[]): any[] {
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

function getChildrensNodes (nodeId: string, dialogNodes: any[]): any[] {
  return dialogNodes.filter((node: { hasOwnProperty: (arg0: string) => any, parent: any }) => {
    if (Object.prototype.hasOwnProperty.call(node, 'parent') && node?.parent === nodeId) {
      return node
    }
  })
}
