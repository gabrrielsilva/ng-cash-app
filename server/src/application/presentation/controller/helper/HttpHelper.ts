import { ServerError } from '../error/ServerError'
import { HttpResponse } from '../port/Http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error.message
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})
