import jwt from 'jsonwebtoken'

export const isAuthenticated = (req,res,next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        message: "Authentication required"
      })
    }

    const decoded = jwt.verify(token,process.env.JWTKEY)

    req.user = decoded
    next()

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    })
  }
}
