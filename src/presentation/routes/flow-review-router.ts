import express from 'express'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/http-helper'
import { FlowReview } from '../controllers/flow-review-controller'

const router = express.Router()

export const flowReviewRouter = router

flowReviewRouter.get('/monitoring', (request, response) => {
  try {
    const { to, from } = request.query
    const requiredParams = ['to', 'from']
    for (const field of requiredParams) {
      if (!request.query[field]) {
        return response.status(400).json({
          status: 400,
          body: badRequest(new MissingParamError(field)).body.message
        })
      }
    }

    void new FlowReview().monitoring(to, from)
      .then((flowReviewRouterResponse: any) => {
        return response.status(flowReviewRouterResponse.statusCode).json(flowReviewRouterResponse)
      })
  } catch (Error) {
    return badRequest(Error)
  }
})
