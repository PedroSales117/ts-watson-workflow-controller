import { DialogNode } from 'ibm-watson/assistant/v1'

export async function deleteUndefinedJump (dialogNodesToValidate: DialogNode[], allNodesList: DialogNode[]): Promise<DialogNode[]> {
  const dialogNodesToValidateIds: string[] = dialogNodesToValidate.map(node => node.dialog_node)
  const AllNodesListIds = allNodesList.map(node => node.dialog_node)

  for (const nodeToValidate of dialogNodesToValidate) {
    if (
      nodeToValidate.next_step?.behavior === 'jump_to' &&
      !dialogNodesToValidateIds.includes(nodeToValidate.next_step?.dialog_node) &&
      !AllNodesListIds.includes(nodeToValidate.next_step?.dialog_node)
    ) {
      console.log(`Jump to ${nodeToValidate.next_step.dialog_node} from '${nodeToValidate.title}'(${nodeToValidate.dialog_node}) deleted.`)
      delete nodeToValidate.next_step
    }
  }
  return dialogNodesToValidate
}
