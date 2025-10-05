import { useState, useEffect } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import ExpenseForm from './ExpenseForm';
import ExpenseFilter from './ExpenseFilter';
import ExpenseItem from './ExpenseItem';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses(filters);
      setExpenses(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      fetchExpenses();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      await updateExpense(editingExpense._id, expenseData);
      setEditingExpense(null);
      fetchExpenses();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Manage Expenses</h2>

      <ErrorMessage message={error} onClose={() => setError('')} />

      <ExpenseForm
        onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
        editingExpense={editingExpense}
        onCancel={handleCancelEdit}
      />

      <ExpenseFilter onFilter={handleFilter} />

      {loading ? (
        <Loading />
      ) : expenses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            No expenses found. Add your first expense above!
          </p>
        </div>
      ) : (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3>Your Expenses ({expenses.length})</h3>
          </div>

          {expenses.map(expense => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDeleteExpense}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
