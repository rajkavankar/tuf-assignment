export const requestBodyValidation = (schema) => {
  return (req, res, next) => {
    const parsedBody = schema.safeParse(req.body)
    if (parsedBody.success) {
      return next()
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      })
    }
  }
}
