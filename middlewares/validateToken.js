import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"

export const validateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization

    let result

    if (!authorizationHeader || typeof authorizationHeader === "undefined") {
      let err = new Error("Unauthorized access")
      err.status = 401
      err.errorType = "Auth error"
      throw err
    }

    const token = req.headers.authorization.split(" ")[1] // Bearer token

    const options = {
      expiresIn: "30s"
    }

    let user = await UserModel.findOne({
      accessToken: token
    })

    if (!user) {
      let err = new Error("Access forbidden")
      err.status = 403
      err.errorType = "Auth error"
      throw err
    }

    result = jwt.verify(token, process.env.JWT_SECRET, options)

    if (!user._id === result.id) {
      let err = new Error("Unauthorized access")
      err.status = 401
      err.errorType = "Auth error"
      throw err
    }

    req.decoded = result

    next()
  } catch (error) {
    let err = new Error("Unauthorized access")
    err.status = 403
    err.errorType = "Auth error"
    error.message.length > 0 ? next(error) : next(err)
  }
}
