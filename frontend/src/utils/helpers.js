import { format } from 'date-fns';

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy');
};

// Format date for input
export const formatDateForInput = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

// Get today's date for input
export const getTodayDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password
export const isValidPassword = (password) => {
  return password.length >= 6;
};
