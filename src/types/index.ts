export interface SuccessResponse<Data> {
  data: Data
}

export interface ErrorResponse extends Error {
  expiredAt?: string
  date?: string
}

export type Fetcher<Data> = (accessToken: string) =>
  Promise<{ data: SuccessResponse<Data>, error: null } | { data: null, error: ErrorResponse }>

