import { Router } from "express"
import {
  createCodeEntry,
  fetchCodeEntries,
} from "../controllers/codeEnty-controller.js"
import { requestBodyValidation } from "../middlewares/requestbody-middleware.js"
import { entrySchema } from "../utils/validations.js"
import { rateLimiter } from "../middlewares/rateLimiter-middleware.js"
const router = Router()

router.post("/", requestBodyValidation(entrySchema), createCodeEntry)

router.get("/", fetchCodeEntries)

export default router
