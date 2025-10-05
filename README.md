# Expense Tracker

A full-stack expense tracking application built with React and Node.js. Track your daily expenses, categorize them, and view insightful charts about your spending habits.

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Expense Management**: Add, edit, delete, and categorize expenses
- **Real-time Dashboard**: View spending summaries and analytics
- **Responsive Design**: Modern UI with Tailwind CSS
- **Data Visualization**: Interactive charts using Recharts
- **Secure API**: Protected routes with authentication middleware

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Recharts** - Charts and data visualization
- **Date-fns** - Date utility library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sujaljaiswal25/expence-xx-20.git
cd expence-xx-20
```

### 2. Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
# Copy the example environment file
copy example.env .env
```

4. Configure your `.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

**Important**: Replace the values with your actual configuration:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong, unique secret key for JWT tokens

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

### 4. Database Setup

**Option A: Local MongoDB**

1. Install MongoDB on your system
2. Start MongoDB service
3. The database will be created automatically when the application starts

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and update `MONGODB_URI` in your `.env` file

### 5. Running the Application

1. **Start the Backend Server** (from backend directory):

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server** (from frontend directory):

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 6. Building for Production

1. **Build the frontend**:

```bash
cd frontend
npm run build
```

2. **Build and serve from backend** (optional):

```bash
cd backend
npm run build
npm start
```

This will build the frontend and copy the files to the backend's public directory, allowing you to serve the entire application from a single server.

## 📂 Project Structure

```
expense-tracker/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── public/            # Static files (built frontend)
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Expenses

- `GET /api/expenses` - Get all expenses for authenticated user
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## 🎨 Features in Detail

### Dashboard

- Total expenses overview
- Monthly spending trends
- Category-wise expense breakdown
- Recent transactions

### Expense Management

- Add expenses with categories
- Edit and delete existing expenses
- Filter expenses by date range
- Search expenses by description

### User Authentication

- Secure registration and login
- JWT-based authentication
- Protected routes
- Session management

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running locally or check your Atlas connection string
   - Verify network access if using MongoDB Atlas

2. **Port Already in Use**

   - Change the PORT in your `.env` file
   - Kill the process using the port: `npx kill-port 5000`

3. **CORS Issues**

   - Ensure your frontend URL is properly configured in CORS settings
   - Check that both servers are running on correct ports

4. **JWT Secret Error**
   - Make sure `JWT_SECRET` is set in your `.env` file
   - Use a strong, unique secret key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sujal Jaiswal**

- GitHub: [@Sujaljaiswal25](https://github.com/Sujaljaiswal25)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All open-source contributors who made this project possible

---

**Happy Expense Tracking! 💰📊**
