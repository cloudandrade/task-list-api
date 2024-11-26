export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function validateUserId(userId: number | null | undefined){
  if (userId === null || userId === undefined) return false
  else return true
}