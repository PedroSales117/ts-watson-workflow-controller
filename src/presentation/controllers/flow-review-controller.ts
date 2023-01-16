import { validateJumpToSpecificNode } from '../helpers/dialogtree/validate-jump-to-specific-node'

export class FlowReview {
  async monitoring (to: any, from: any): Promise<any> {
    void await validateJumpToSpecificNode(to, from)
      .then(response => {
        return response
      })
  }
}
