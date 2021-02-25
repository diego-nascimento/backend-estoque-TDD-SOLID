import { httpResponse } from "../protocols/http";

export const serverError = (error: Error): httpResponse =>{
  const response: httpResponse = {
    statusCode: 500,
    body: {
      Error: ('Something went wrong: ' + error.message)
    }
  }
  return response
}

export const badRequest = (error: Error): httpResponse =>{
  const response: httpResponse = {
    statusCode: 400,
    body: {
      Error: 'Bad Request: ' + error.message
    }
  }
  return response
}


export const ok = (data: any): httpResponse => {
  const response: httpResponse = {
    statusCode: 200,
    body: data
  }

  return response
}