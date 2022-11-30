export const validateInputs = (schema) => async (req, res, next) => {
  try {
    await schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params
      },
      { abortEarly: false }
    )
    next()
  } catch (error) {
    let errors = []

    error.inner.forEach((e) => {
      errors.push({
        name: e.path.split(".")[1],
        message: e.message
      })
    })

    let err = new Error("Validation error")
    err.status = 400
    err.errorType = "Validation error"
    err.errorProps = errors
    next(err)
  }
}
