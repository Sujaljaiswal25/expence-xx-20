import { useEffect, useState } from "react";
import { getSummary } from "../../services/expenseService";
import { formatCurrency } from "../../utils/helpers";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loading from "../common/Loading";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
];

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getSummary();
      setSummary(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!summary) return null;

  const categoryData = summary.categoryBreakdown.map((item) => ({
    name: item.category,
    value: parseFloat(item.total),
  }));

  const monthlyData = summary.monthlyBreakdown.map((item) => ({
    month: item.month,
    amount: parseFloat(item.total),
  }));

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-blue-100 mb-1 sm:mb-2">
                Total Spent
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {formatCurrency(summary.totalSpent)}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-green-100 mb-2">
                Total Transactions
              </h3>
              <p className="text-3xl font-bold">{summary.transactionCount}</p>
            </div>
            <div className="h-12 w-12 bg-green-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-purple-100 mb-2">
                Categories
              </h3>
              <p className="text-3xl font-bold">
                {summary.categoryBreakdown.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-amber-100 mb-2">
                Avg per Transaction
              </h3>
              <p className="text-3xl font-bold">
                {formatCurrency(
                  summary.totalSpent / summary.transactionCount || 0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-amber-400 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Category Breakdown - Pie Chart */}
        {categoryData.length > 0 && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Expenses by Category
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {monthlyData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Monthly Spending
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="amount" fill="#3498db" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {summary.categoryBreakdown.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Top Spending Categories
          </h3>
          <div className="space-y-4">
            {summary.categoryBreakdown.slice(0, 5).map((item, index) => (
              <div
                key={item.category}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                style={{
                  borderLeft: `4px solid ${COLORS[index % COLORS.length]}`,
                }}
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {item.category}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.count} transaction{item.count > 1 ? "s" : ""}
                  </div>
                </div>
                <div
                  className="text-xl font-bold"
                  style={{ color: COLORS[index % COLORS.length] }}
                >
                  {formatCurrency(item.total)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
