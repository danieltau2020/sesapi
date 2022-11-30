// Error handling middleware function for logging the error message
export const errorLogger = (error, req, res, next) => {
  console.log(`Error - ${error.message}`)
  next(error)
}

// Error handling middleware function that reads the error message
// and sends back a response in JSON format
export const errorResponder = (error, req, res, next) => {
  res.header("Content-Type", "application/json")

  const status = error.status || 400
  res.status(status).json({
    message: error.message,
    errorType: error.errorType ? error.errorType : "",
    errorProps: error.errorProps ? error.errorProps : null
  })
}

// Fallback middleware function for returning
// 404 error for undefined paths
export const invalidPathHandler = (req, res, next) => {
  res.status(404)
  res.send("Invalid path")
}
