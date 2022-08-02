import { PORT } from './presentation/config'
import { app } from './presentation/config/express.config'
import { createDialogTreeRouter } from './presentation/routes/add-dialog-tree-router'
import { updateDialogNodeRouter } from './presentation/routes/update-dialog-node'

app.listen(PORT, () => {
  console.log(`Listen on https://localhost:${PORT}`)
})

app.use('/dialogtree', createDialogTreeRouter)
app.use('/nodes', updateDialogNodeRouter)
