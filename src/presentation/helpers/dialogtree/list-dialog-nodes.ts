import { DialogNode } from 'ibm-watson/assistant/v1'
import { createTargetAssistantV1, createSourceAssistantV1 } from '../workspace/create-assistant'
import { WATSON_TARGET_WORKSPACE_ID, WATSON_SOURCE_WORKSPACE_ID } from '../../config'

export class ListWorkspaceDialogNodes {
  async targetWorkspace (pageLimitNumber: number): Promise<DialogNode[]> {
    return await createTargetAssistantV1?.listDialogNodes({
      workspaceId: WATSON_TARGET_WORKSPACE_ID,
      pageLimit: pageLimitNumber
    })
      .then((targetWorkspaceNodes: any) => {
        return targetWorkspaceNodes?.result?.dialog_nodes
      })
  }

  async sourceWorkspace (pageLimitNumber: number): Promise<DialogNode[]> {
    return await createSourceAssistantV1?.listDialogNodes({
      workspaceId: WATSON_SOURCE_WORKSPACE_ID,
      pageLimit: pageLimitNumber
    })
      .then((sourceWorkspaceNodes: any) => {
        return sourceWorkspaceNodes?.result?.dialog_nodes
      })
  }
}
