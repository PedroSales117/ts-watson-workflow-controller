import { router } from '../../config/express.config'
import { SearchNode } from '../../controllers/nodes/search-controller'

export const searchRouter = router
const makeSearchNodebyAction = new SearchNode().byAction

searchRouter.get('/attribute/actions', (req, res) => {
  void makeSearchNodebyAction().then(response => {
    // response.body.attributeArray.map((attribute: any) => {
    //   return console.log(attribute.action.name)
    // })
    return res.status(200).json({
      data: response
    })
  })
})
