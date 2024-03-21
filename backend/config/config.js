import dotenv from "dotenv"
dotenv.config()

export const config = {
  NODE_ENV: String(process.env.NODE_ENV),
  PORT: Number(process.env.PORT),
}
