


const express = require("express")
const router = express.Router()
const prisma = require("../db")
const jwt = require("jsonwebtoken")

// To check if the users valid authKey
function checkLogin(req, res, next) {
  const header = req.headers.authorization

  if (!header) {
    return res.json({ error: "No authKey" })
  }

  const authKey = header.split(" ")[1]

  try {
    const user = jwt.verify(authKey, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    return res.json({ error: "authKey not valid" })
  }
}

// To add expense
router.post("/add", checkLogin, async (req, res) => {
    console.log("EXPENSE BODY:", req.body)

  const { title, amount, date, category_id } = req.body

  try {
    const newExpense = await prisma.expense.create({
      data: {
        title: title,
        amount: Number(amount),
        date: new Date(date),
        category_id: category_id,
        user_id: req.user.id
      }
    })
    res.json(newExpense)
  } catch (err) {
    res.json({ error: "Could not save expense" })
  }
})

// To get all of the expenses for the logged users
router.get("/", checkLogin, async (req, res) => {
  try {
    const allExpenses = await prisma.expense.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: "desc" }
    })
    res.json(allExpenses)
  } catch (err) {
    res.json({ error: "Could not load expenses" })
  }
})

module.exports = router
