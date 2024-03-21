import { z } from "zod"

export const entrySchema = z.object({
  username: z.string(),
  code: z.string(),
  language: z.string(),
  stdin: z.string(),
})
