import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const sucessResponse = (response: any): HttpResponse => ({
  statusCode: 200,
  body: response
})

export const notFoundError = (response: any): HttpResponse => ({
  statusCode: 404,
  body: response
})
