import express from 'express'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/http-helper'
import { rollback } from '../controllers/rollback-controller'

const router = express.Router()

export const rollbackRouter = router

rollbackRouter.delete('/', (request, response) => {
  try {
    const { dialogNodeId } = request.body
    const requiredParams = ['dialogNodeId']
    for (const field of requiredParams) {
      if (!request.body[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void rollback(dialogNodeId)
      .then((rollbackRouterResponse: any) => {
        return response.status(rollbackRouterResponse.statusCode).json(rollbackRouterResponse)
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
