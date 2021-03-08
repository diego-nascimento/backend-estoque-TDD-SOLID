export interface httpRequest {
  body?: any
  file?: any
  params?: any
  query?: any
}
export interface httpResponse {
  statusCode: number,
  body: any
}
