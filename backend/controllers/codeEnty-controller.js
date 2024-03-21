import { asyncHandler } from "../utils/asyncHandler.js"
import { ServerError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { db } from "../prisma/db.js"
import { StatusCodes } from "http-status-codes"

//METHOD: POST
//PATH: /api/v1/codeentry
export const createCodeEntry = asyncHandler(async (req, res) => {
  const { username, code, language, stdin } = req.body

  const createEntry = await db.codeEntries.create({
    data: {
      username,
      code,
      language,
      stdin,
    },
  })

  if (createEntry) {
    res
      .status(StatusCodes.CREATED)
      .json(new ApiResponse("Code entry added", createEntry))
  } else {
    throw new ServerError()
  }
})

//METHOD: GET
//PATH: /api/v1/codeentry
export const fetchCodeEntries = asyncHandler(async (_req, res) => {
  const codeEntries = await db.codeEntries.findMany()

  if (codeEntries) {
    res
      .status(StatusCodes.OK)
      .json(new ApiResponse("Fetched entries", codeEntries))
  } else {
    throw new ServerError()
  }
})
