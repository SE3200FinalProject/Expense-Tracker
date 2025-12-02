

const express = require("express");
const router = express.Router();
const prisma = require("../db");
const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.json({ error: "No authKey" });

  try {
    const user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    return res.json({ error: "authKey not valid" });
  }
}

// To create or update budget
router.post("/", checkLogin, async (req, res) => {
  const { month, year, amount } = req.body;

  try {
    const budget = await prisma.budget.upsert({
      where: {
        user_id_month_year: {
          user_id: req.user.id,
          month,
          year
        }
      },
      update: { amount },
      create: {
        user_id: req.user.id,
        month,
        year,
        amount
      }
    });

    res.json(budget);
  } catch {
    res.json({ error: "Could not save budget" });
  }
});

// get budget
router.get("/", checkLogin, async (req, res) => {
  const { month, year } = req.query;

  try {
    const budget = await prisma.budget.findUnique({
      where: {
        user_id_month_year: {
          user_id: req.user.id,
          month: Number(month),
          year: Number(year)
        }
      }
    });

    res.json(budget);
  } catch {
    res.json({ error: "Could not load budget" });
  }
});

router.get("/summary", checkLogin, async (req, res) => {
  const { month, year } = req.query;

  try {
    const budget = await prisma.budget.findUnique({
      where: {
        user_id_month_year: {
          user_id: req.user.id,
          month: Number(month),
          year: Number(year)
        }
      }
    });

    if (!budget) return res.json({ error: "No budget found" });

    const expenses = await prisma.expense.findMany({
      where: {
        user_id: req.user.id,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1)
        }
      }
    });

    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    res.json({
      budget: Number(budget.amount),
      totalSpent: total,
      remaining: Number(budget.amount) - total
    });
  } catch {
    res.json({ error: "Could not load summary" });
  }
});

module.exports = router;
