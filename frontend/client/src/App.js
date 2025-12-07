import React, { useState, useEffect } from "react";
import NewExpense from "./components/NewExpense/NewExpense";
import { loginUser, registerUser, fetchExpenses, createExpense, getAuthToken} from "./api/client";
import Budget from "./components/Budget/Budget";


const App = () => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [auth, setAuth] = useState({ email: "", password: "", name: "" });

useEffect(() => {
  const token = getAuthToken();

  if (token) {
    fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(async (me) => {
        setUser(me);

        // Load expenses automatically after refresh
        const list = await fetchExpenses();
        setExpenses(list);
      })
      .catch(() => {
        console.log("Token expired or invalid");
      });
  }
}, []);


  const handleRegister = async () => {
    try {
      await registerUser(auth);
      alert("User Registered! Now proceed to log in.");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const me = await loginUser(auth);
      setUser(me);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses().then(setExpenses).catch(console.error);
    }
  }, [user]);

  const handleAddExpense = async (expense) => {
    try {
      await createExpense(expense);
      const list = await fetchExpenses();
      setExpenses(list);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Expense Tracker</h1>

      {!user && (
        <div style={{ marginBottom: 30 }}>
          <input
            placeholder="Name"
            value={auth.name}
            onChange={(e) => setAuth({ ...auth, name: e.target.value })}
          />
          <input
            placeholder="Email"
            value={auth.email}
            onChange={(e) => setAuth({ ...auth, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          />

          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {user && (
        <>
          <NewExpense onAddExpense={handleAddExpense} />
            <Budget />
            <h2>Your Expenses</h2>
          {expenses.map((e) => (
            <div key={e.id}>
              {e.title} — ${e.amount} — {new Date(e.date).toLocaleDateString()}
            </div>
          ))}
        </>
      )}

    </div>
  );
};

export default App;
