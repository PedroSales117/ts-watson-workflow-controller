import { DialogNode } from 'ibm-watson/assistant/v1'

export async function deleteUndefinedJump (exportedDialogTree: DialogNode[]): Promise<DialogNode[]> {
  const dialogNodesId: string[] = exportedDialogTree.map(node => node.dialog_node)
  for (const node of exportedDialogTree) {
    if (node?.next_step?.behavior === 'jump_to' && !dialogNodesId.includes(node.next_step?.dialog_node)) {
      delete node.next_step
    }
  }
  return exportedDialogTree
}
