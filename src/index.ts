import { PORT } from './presentation/config'
import { app } from './presentation/config/express.config'
import { createDialogTreeRouter } from './presentation/routes/add-dialog-tree-router'

app.listen(PORT, () => {
  console.log(`Listen on https://localhost:${PORT}`)
})

app.use('/dialogtree', createDialogTreeRouter)
