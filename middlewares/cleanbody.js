import sanitize from "mongo-sanitize"

export const cleanBody = (req, res, next) => {
  try {
    req.body = sanitize(req.body)
    req.query = sanitize(req.query)
    req.params = sanitize(req.params)
    next()
  } catch (error) {
    let err = new Error("Couldn't sanitize request.")
    err.status = 403
    err.errorType = "Logout"
    error.message.length > 0 ? next(error) : next(err)
  }
}
