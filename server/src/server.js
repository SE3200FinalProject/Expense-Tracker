


    //  express setup
     const express = require("express")
        const cors = require("cors")
        require("dotenv").config()

         const app = express()
           app.use(cors())
         app.use(express.json())

// Budget routes 


const budgetRoutes = require("./routes/budgets")
app.use("/api/budgets", budgetRoutes)

const authRoutes = require("./routes/auth")

app.use("/api/auth", authRoutes)


// to connect to the expense routes
const expenseRoutes = require("./routes/expenses")
app.use("/api/expenses", expenseRoutes)

  app.get("/", (req, res) => {
         res.send("The Server is working fine")
})

// to start the server
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log("Server running on port", port)
})

