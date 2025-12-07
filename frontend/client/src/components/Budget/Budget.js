import React, { useState } from "react";
import { saveBudget, getBudget, getBudgetSummary } from "../../api/client";


export default function Budget() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [amount, setAmount] = useState("");

    const [budget, setBudget] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!month || !year || !amount) return alert("Fill all fields first");

        try {
            setLoading(true);
            await saveBudget({ month, year, amount });
            alert("Budget saved");
            await handleLoadBudget();
            await handleLoadSummary();
        } catch (err) {
            console.error(err);
            alert("Error saving budget");
        } finally {
            setLoading(false);
        }
    };
    const handleLoadBudget = async () => {
        if (!month || !year) return alert("Enter month and year first");

        try {
            setLoading(true);
            const data = await getBudget({ month, year });
            setBudget(data);
        } catch (err) {
            console.error(err);
            alert("Error loading budget");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadSummary = async () => {
        if (!month || !year) return alert("Enter month and year first");

        try {
            setLoading(true);
            const data = await getBudgetSummary({ month, year });
            setSummary(data);
        } catch (err) {
            console.error(err);
            alert("Error loading summary");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 24 }}>
            <h3>Monthly Budget</h3>

            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <input
                    type="number"
                    placeholder="Month (1-12)"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Budget Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleSave} disabled={loading}>
                    Save Budget
                </button>
                <button onClick={handleLoadBudget} disabled={loading}>
                    Load Budget
                </button>
                <button onClick={handleLoadSummary} disabled={loading}>
                    Load Summary
                </button>
            </div>

            {budget && (
                <div style={{ marginTop: 8 }}>
                    <h4>Saved Budget</h4>
                    <p>
                        {budget.month}/{budget.year}: ${Number(budget.amount)}
                    </p>
                </div>
            )}

            {summary && (
                <div style={{ marginTop: 8 }}>
                    <h4>Summary</h4>
                    <p>Budget: ${Number(summary.budget)}</p>
                    <p>Total Spent: ${Number(summary.totalSpent)}</p>
                    <p>Remaining: ${Number(summary.remaining)}</p>
                </div>
            )}

            {loading && <p>Loading…</p>}
        </div>
    );
}
