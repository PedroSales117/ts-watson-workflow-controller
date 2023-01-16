import { app } from './presentation/config/express.config'
import { exportDialogTreeRouter } from './presentation/routes/export-dialog-tree-router'
import { rollbackRouter } from './presentation/routes/rollback-router'
import { flowReviewRouter } from './presentation/routes/flow-review-router'

app.use('/export', exportDialogTreeRouter)
app.use('/rollback', rollbackRouter)
app.use('/flowreview', flowReviewRouter)
