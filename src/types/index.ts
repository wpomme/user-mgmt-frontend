export interface SuccessResponse<DATA> {
  data: DATA
}

export interface ErrorResponse extends Error {
  expiredAt?: string
  date?: string
}

export type Fetcher<DATA, ARGS extends unknown[]> = (accessToken: string, ...args: ARGS) =>
  Promise<{ data: SuccessResponse<DATA>, error: null } | { data: null, error: ErrorResponse }>

