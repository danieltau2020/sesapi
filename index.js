import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import fileUpload from "express-fileupload"
import {
  errorLogger,
  errorResponder,
  invalidPathHandler
} from "./middlewares/errorHandlingMiddleware.js"
import assetRoutes from "./routes/assetRoutes.js"

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("Mongo db connected successfully")
  })
  .catch((err) => {
    console.log("Mongo db connection error", err)
  })

app.listen(process.env.PORT || 5000, () => {
  console.log(`ses server running on port ${process.env.PORT}`)
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ),
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
  next()
})

app.use("/api/assets", assetRoutes)

app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)
