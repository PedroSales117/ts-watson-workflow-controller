/* eslint-disable array-callback-return */
export function getChildrensNodes (nodeId: string, dialogNodes: any[]): any[] {
  return dialogNodes.filter((node: { hasOwnProperty: (arg0: string) => any, parent: any }) => {
    if (Object.prototype.hasOwnProperty.call(node, 'parent') && node?.parent === nodeId) {
      return node
    }
  })
}
