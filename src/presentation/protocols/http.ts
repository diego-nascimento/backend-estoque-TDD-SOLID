export interface httpRequest {
  body?: any
  file?: any
  params?: any
  query?: any,
  headers?: any
}
export interface httpResponse {
  statusCode: number,
  body: any
}
