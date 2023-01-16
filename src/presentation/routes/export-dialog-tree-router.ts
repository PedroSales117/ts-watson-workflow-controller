import express from 'express'
import { MissingParamError } from '../errors'
import { exportDialogTree } from '../helpers/dialogtree/add-dialog-tree'
import { badRequest } from '../helpers/http-helper'

const router = express.Router()

export const exportDialogTreeRouter = router

exportDialogTreeRouter.post('/', (request, response) => {
  try {
    interface requiredFieldsInterface {
      parentNodeId: string
      treeLastNodeId: string
    }

    const { parentNodeId, treeLastNodeId }: requiredFieldsInterface = request.body
    const requiredFields = ['parentNodeId', 'treeLastNodeId']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          error: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void exportDialogTree(parentNodeId, treeLastNodeId)
      .then((exportDialogTreeResponse: any) => {
        return response.status(exportDialogTreeResponse.statusCode).json({
          status: exportDialogTreeResponse.statusCode,
          body: exportDialogTreeResponse.body.message
        })
      })
  } catch (createDialogTreeRouterError) {
    return createDialogTreeRouterError
  }
})
