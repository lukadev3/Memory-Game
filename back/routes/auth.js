const router = require("express").Router()
const AuthService = require("../services/auth")
const passport = require("./config/auth")

router.post("/register", async (req, res) => {
  try {
    const user = await AuthService.register(req.body)
    if (!user) {
      return res.status(400).json({ message: "Registration failed" })
    }
    res.status(201).json({ token: user.generateJwt() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post(
  "/login",
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: err.message })
      if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" })
      return res.status(200).json({ token: AuthService.getJwt(user) })
    })(req, res, next)
  }
)

router.post(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Invalid or expired token" })
    }
    res.json({ valid: true, user: { id: req.user._id, email: req.user.email, name: req.user.name } })
  }
)

module.exports = router
