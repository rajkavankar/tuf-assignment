import { Router } from "express"
import codeEntryRoutes from "./condeEntries-routes.js"

const router = Router()

router.use("/codeentry", codeEntryRoutes)

export default router
