export class MissingWorkspaceParamError extends Error {
  constructor (paramName: string) {
    super(`Missing workspace param ${paramName}`)
    this.name = 'MissingParamError'
  }
}
