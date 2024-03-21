import { app } from "./app.js"
import { config } from "./config/config.js"

const { NODE_ENV, PORT } = config

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${NODE_ENV} environment`)
})
