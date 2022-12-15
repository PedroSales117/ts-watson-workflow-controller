import { PORT } from './presentation/config'
import { app } from './presentation/config/express.config'
import { createDialogTreeRouter } from './presentation/routes/dialogtree/add-dialog-tree-router'
import { deleteRouter, updateRouter, validateJumpRouter, searchRouter } from './presentation/routes/nodes/index'
import { updateIntentRouter } from './presentation/routes/workspace/intents/update-router'
import { updateEntityRouter } from './presentation/routes/workspace/entity/update-router'

app.listen(PORT, () => {
  console.log(`Listen on https://localhost:${PORT}`)
})

app.use('/dialogtree', createDialogTreeRouter)
app.use('/intents', updateIntentRouter)
app.use('/entity', updateEntityRouter)
app.use('/nodes', updateRouter, deleteRouter, validateJumpRouter)
app.use('/search', searchRouter)
