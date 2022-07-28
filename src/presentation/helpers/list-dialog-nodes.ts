import { DialogNode } from 'ibm-watson/assistant/v1'
import { createAssistantV1 } from './assistant'
import { WATSON_ASSISTANT_TARGET_WORKSPACE_ID, WATSON_ASSISTANT_SOURCE_WORKSPACE_ID } from '../config'

export class ListWorkspaceDialogNodes {
  async targetWorkspace (pageLimitNumber: number): Promise<DialogNode[]> {
    return await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_TARGET_WORKSPACE_ID,
      pageLimit: pageLimitNumber
    })
      .then((targetWorkspaceNodes: any) => {
        return targetWorkspaceNodes?.result?.dialog_nodes
      })
  }

  async sourceWorkspace (pageLimitNumber: number): Promise<DialogNode[]> {
    return await createAssistantV1?.listDialogNodes({
      workspaceId: WATSON_ASSISTANT_SOURCE_WORKSPACE_ID,
      pageLimit: pageLimitNumber
    })
      .then((sourceWorkspaceNodes: any) => {
        return sourceWorkspaceNodes?.result?.dialog_nodes
      })
  }
}
