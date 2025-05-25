// src/pages/GoalPlanner.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

export default function GoalPlanner() {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");

  const addGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      id: uuidv4(),
      name: goalName,
      target: parseFloat(targetAmount),
      saved: parseFloat(savedAmount),
    };
    setGoals([...goals, newGoal]);
    setGoalName("");
    setTargetAmount("");
    setSavedAmount("");
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const updateSavedAmount = (id, newAmount) => {
    setGoals(goals.map((goal) =>
      goal.id === id ? { ...goal, saved: newAmount } : goal
    ));
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-tr from-pink-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          🎯 Goal Planner
        </h2>

        <form onSubmit={addGoal} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <input
            type="number"
            placeholder="Saved Amount"
            value={savedAmount}
            onChange={(e) => setSavedAmount(e.target.value)}
            required
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="md:col-span-3 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Add Goal
          </button>
        </form>

        {goals.length === 0 ? (
          <p className="text-gray-500 italic text-center">No goals yet. Start planning now!</p>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const progress = Math.min((goal.saved / goal.target) * 100, 100).toFixed(0);
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 p-4 rounded-xl shadow border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{goal.name}</h4>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-1">
                    <div
                      className="h-4 bg-green-500 transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{goal.saved} / ₹{goal.target}</span>
                    <span>{progress}%</span>
                  </div>

                  <input
                    type="number"
                    value={goal.saved}
                    onChange={(e) =>
                      updateSavedAmount(goal.id, parseFloat(e.target.value) || 0)
                    }
                    className="mt-2 w-full px-4 py-1 border border-gray-300 rounded-md"
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </main>
  );
}
