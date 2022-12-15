import { ListWorkspaceDialogNodes } from '../../helpers/dialogtree/list-dialog-nodes'
import { badRequest, sucessResponse } from '../../helpers/http-helper'

export class SearchNode {
  async byAction (): Promise<any> {
    try {
      const dialogNodes = await new ListWorkspaceDialogNodes().targetWorkspace(100000)
      const attributeArray: any = []

      for (const dialogNode of dialogNodes) {
        if (dialogNode.actions) {
          attributeArray.push({
            dialogNodeId: dialogNode.dialog_node,
            action: {
              name: dialogNode?.actions[0].name,
              parameters: dialogNode?.actions[0].parameters
            }
          })
        }
      }

      return sucessResponse({
        attributeArray
      })
    } catch (error) {
      return badRequest(error)
    }
  }
}
