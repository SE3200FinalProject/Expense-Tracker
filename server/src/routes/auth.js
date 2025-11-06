// auth.js
  
 const express = require("express")
const passwordLocker = require("bcrypt")
const security_key = require("jsonwebtoken")
const data_store = require("../db")

  const router = express.Router()

// to register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashed = await passwordLocker.hash(password, 10)
    const user = await data_store.user.create({
      data: { name, email, password_hash: hashed },
    })
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: "Email already used" })
  }
})

// login existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await data_store.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: "the user is not found" })

    const match = await passwordLocker.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: "invalid password" })

    const token = security_key.sign({ id: user.id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch {
    res.status(500).json({ error: "Login failed" })
  }
})

module.exports = router
