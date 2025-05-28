import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [income, setIncome] = useState(() => Number(localStorage.getItem("income")) || 0);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [incomeInput, setIncomeInput] = useState("");

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [expenseInput, setExpenseInput] = useState({ name: "", amount: "" });

  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddIncome = (e) => {
    e.preventDefault();
    const parsedIncome = parseFloat(incomeInput);
    if (!isNaN(parsedIncome)) {
      setIncome(parsedIncome);
      setIncomeInput("");
      setIsEditingIncome(false);
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseInput.amount);
    if (!expenseInput.name || isNaN(amount)) return;
    setExpenses([...expenses, { id: Date.now(), ...expenseInput, amount }]);
    setExpenseInput({ name: "", amount: "" });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleEditExpense = (id) => {
    const exp = expenses.find((exp) => exp.id === id);
    if (exp) {
      setExpenseInput({ name: exp.name, amount: exp.amount });
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const savings = income - totalExpenses;

  // Data for Bar Chart
  const barData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [income, totalExpenses, savings],
        backgroundColor: ["#16a34a", "#dc2626", "#2563eb"]
      }
    ]
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-6">Dashboard</h2>

        {/* Income display + edit toggle */}
        <div className="mb-8 flex items-center gap-4">
          {!isEditingIncome ? (
            <>
              <p className="text-xl">
                Monthly Income: <span className="font-bold">₹{income}</span>
              </p>
              <button
                onClick={() => setIsEditingIncome(true)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </>
          ) : (
            <form onSubmit={handleAddIncome} className="flex items-center gap-4">
              <input
                type="number"
                placeholder="Enter your monthly income"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                className="p-3 border rounded-lg w-full max-w-xs"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditingIncome(false);
                  setIncomeInput("");
                }}
                className="text-gray-600 px-4 py-3 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        <form onSubmit={handleAddExpense} className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Expense Name"
            value={expenseInput.name}
            onChange={(e) => setExpenseInput({ ...expenseInput, name: e.target.value })}
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenseInput.amount}
            onChange={(e) => setExpenseInput({ ...expenseInput, amount: e.target.value })}
            className="p-3 border rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Add Expense
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-600">₹{income}</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">₹{totalExpenses}</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Savings</h3>
            <p className="text-3xl font-bold text-blue-600">₹{savings}</p>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow mb-16" style={{ height: 300 }}>
          <h3 className="text-2xl font-semibold mb-4">Income vs Expenses vs Savings</h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                tooltip: { enabled: true },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: Math.ceil(Math.max(income, totalExpenses, savings) / 5) || 1,
                  },
                },
              },
            }}
          />
        </div>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Expenses</h3>
          <div className="bg-white p-6 rounded-xl shadow">
            {expenses.length === 0 ? (
              <p className="text-gray-500">No expenses recorded yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {expenses.map((exp) => (
                  <li key={exp.id} className="flex justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-800">{exp.name}</p>
                      <p className="text-sm text-gray-500">₹{exp.amount}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditExpense(exp.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </motion.section>
    </main>
  );
}
