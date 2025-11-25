import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function ServerTest() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("Pa55word1");
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [out, setOut] = useState("");
  const [items, setItems] = useState([]);

  // convenience: axios instance honors CRA proxy (baseURL = "/")
  const api = useMemo(() => {
    const instance = axios.create({ baseURL: "/" });
    instance.interceptors.request.use((cfg) => {
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
      return cfg;
    });
    return instance;
  }, [token]);

  const show = (obj) => setOut(JSON.stringify(obj, null, 2));

  // ---- auth
  const register = async () => {
    try {
      const { data } = await api.post("/api/v1/auth/register", { email, password });
      show({ registered: data });
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  const login = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", { email, password }); // login can be public
      setToken(data.token);
      localStorage.setItem("jwt", data.token);
      show({ loggedIn: true, tokenPreview: data.token.slice(0, 24) + "…" });
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  const me = async () => {
    try {
      const { data } = await api.get("/api/v1/auth/me");
      show({ me: data });
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("jwt");
    show({ loggedOut: true });
  };

  // ---- expenses
  const listExpenses = async () => {
    try {
      const { data } = await api.get("/api/v1/expenses");
      setItems(data);
      show({ items: data });
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  const createExpense = async () => {
    try {
      const body = {
        title: "Coffee",
        amount: 3.75, // dollars; server stores cents
        date: new Date().toISOString(),
        category: "Food",
      };
      const { data } = await api.post("/api/v1/expenses", body);
      show({ created: data });
      await listExpenses();
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  const updateFirstExpense = async () => {
    try {
      if (!items.length) {
        return show({ tip: "No items yet. Click 'Create $3.75 Coffee' first." });
      }
      const id = items[0].id;
      const body = { title: items[0].title + " (edited)" };
      const { data } = await api.put(`/api/v1/expenses/${id}`, body);
      show({ updated: data });
      await listExpenses();
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  const deleteFirstExpense = async () => {
    try {
      if (!items.length) {
        return show({ tip: "No items to delete. Create one first." });
      }
      const id = items[0].id;
      await api.delete(`/api/v1/expenses/${id}`);
      show({ deletedId: id });
      await listExpenses();
    } catch (err) {
      show(err.response?.data || { error: String(err) });
    }
  };

  // optional: on mount, try to show me() if token exists
  useEffect(() => {
    if (token) {
      me().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 16 }}>
      <h3>Backend Test</h3>
      <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <strong>Auth</strong>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={me} disabled={!token}>/me</button>
            <button onClick={logout} disabled={!token}>Logout</button>
          </div>
          <small>Token: {token ? token.slice(0, 24) + "…" : "(none)"}</small>
        </div>

        <hr />

        <div style={{ display: "grid", gap: 6 }}>
          <strong>Expenses (auth required)</strong>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={createExpense} disabled={!token}>Create $3.75 Coffee</button>
            <button onClick={listExpenses} disabled={!token}>List Expenses</button>
            <button onClick={updateFirstExpense} disabled={!token}>Update First</button>
            <button onClick={deleteFirstExpense} disabled={!token}>Delete First</button>
          </div>
          <small>Items in state: {items.length}</small>
        </div>

        <pre style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: 8, borderRadius: 6 }}>
{out}
        </pre>
      </div>
    </div>
  );
}
