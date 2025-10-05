import { formatCurrency, formatDate } from '../../utils/helpers';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense._id);
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <strong style={{ fontSize: '18px', color: '#2c3e50' }}>
              {formatCurrency(expense.amount)}
            </strong>
          </div>
          <div>
            <span style={{
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {expense.category}
            </span>
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            📅 {formatDate(expense.date)}
          </div>
        </div>
        {expense.note && (
          <div style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>
            📝 {expense.note}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onEdit(expense)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
