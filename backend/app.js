import express from "express"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes/index.js"
const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors())
app.use(morgan("dev"))

app.use("/api", routes)

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Health check",
  })
})

export { app }
