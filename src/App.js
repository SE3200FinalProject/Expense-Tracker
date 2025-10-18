import React, { useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import ServerTest from "./ServerTest"; // harmless test box to check backend link

// If you already had your own dummy data, keep it here:
const DUMMY_EXPENSES = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 6, 9),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2020, 9, 29),
    },
    {
      id: "e4",
      title: "New Desk (wooden)",
      amount: 450,
      date: new Date(2020, 2, 12),
    },
  ];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <NewExpense onAddExpense={addExpenseHandler} />

      {/* If you have an Expenses list component, uncomment the next line */}
      {/* <Expenses items={expenses} /> */}

      {/* Backend connectivity test (calls /api/v1/auth/me via CRA proxy) */}
      <ServerTest />
    </div>
  );
};

export default App;
