import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createExpense } from "../../services/expenseService";
import Summary from "./Summary";
import ExpenseForm from "../expenses/ExpenseForm";
import ErrorMessage from "../common/ErrorMessage";

const Dashboard = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refreshSummary, setRefreshSummary] = useState(0);

  const handleAddExpense = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createExpense(formData);
      setSuccess("Expense added successfully!");
      setShowForm(false);
      setRefreshSummary((prev) => prev + 1); // Trigger summary refresh

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Here's your expense overview
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  showForm
                    ? "M6 18L18 6M6 6l12 12"
                    : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                }
              />
            </svg>
            <span>{showForm ? "Close Form" : "Add Expense"}</span>
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 flex items-center animate-slideIn">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">{success}</span>
          </div>
        )}

        {/* Error Message */}
        <ErrorMessage message={error} onClose={() => setError("")} />
      </div>

      {/* Expense Form */}
      {showForm && (
        <div className="animate-fadeIn">
          <ExpenseForm onSubmit={handleAddExpense} />
        </div>
      )}

      {/* Summary */}
      <Summary key={refreshSummary} />
    </div>
  );
};

export default Dashboard;
