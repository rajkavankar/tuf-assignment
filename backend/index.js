import { app } from "./app.js"
import { config } from "./config/config.js"

const { NODE_ENV, PORT } = config

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT} in ${NODE_ENV} environment`)
})
