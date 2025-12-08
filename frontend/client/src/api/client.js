const TOKEN_KEY = "expenseToken";
const API_URL = "https://expense-tracker-production-9262.up.railway.app/api";

let authToken = null;

// Save token (memory + localStorage)
export function setAuthToken(token) {
  authToken = token ?? null;

  if (authToken) {
    localStorage.setItem(TOKEN_KEY, authToken);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

// Load token
export function getAuthToken() {
  if (authToken) return authToken;

  const stored = localStorage.getItem(TOKEN_KEY);
  authToken = stored ?? null;
  return authToken;
}

// Universal request handler
async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getAuthToken();

  // Attach JSON body
  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    options.body = JSON.stringify(options.body);
  }

  // Attach JWT token
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

//
// AUTH FUNCTIONS
//

export function registerUser({ name, email, password }) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}

export async function loginUser({ email, password }) {
  const login = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  setAuthToken(login.token);

  return apiRequest("/auth/me"); // returns user profile
}

//
// EXPENSE FUNCTIONS
//

export function fetchExpenses() {
  return apiRequest("/expenses"); // your backend returns array directly
}

export function createExpense(expense) {
  return apiRequest("/expenses/add", {
    method: "POST",
    body: expense,
  });
}
export function saveBudget({ month, year, amount }) {
    return apiRequest("/budgets", {
        method: "POST",
        body: {
            month: Number(month),
            year: Number(year),
            amount: Number(amount),
        },
    });
}
// Get a single budget for a month/year
export function getBudget({ month, year }) {
    return apiRequest(`/budgets?month=${month}&year=${year}`);
}

// Get budget summary (budget, total spent, remaining)
export function getBudgetSummary({ month, year }) {
    return apiRequest(`/budgets/summary?month=${month}&year=${year}`);
}
