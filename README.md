# ADVANTO MERN Stack Coding Challenge

## How to run this application 

## Getting Started

### Clone the repository

```
git clone https://github.com/LokeshAlli21/ADVANTO-MERNStack-Coding-Challenge.git
cd ADVANTO-MERNStack-Coding-Challenge
```

## Backend Setup

#### 1. Install backend dependencies:

```
npm install
```

### 2. Create a .env file in the root and add the following environment variables:
```
API_URL="https://s3.amazonaws.com/roxiler.com/product_transaction.json"
PORT=5000
DB_URL="mongodb://localhost:27017/mern_stack_db"
```

### 3. Start the backend server:
```
node server.js 
```
The backend will run on http://localhost:5000

## Frontend Setup

### 1. Install frontend dependencies:
```
cd ../frontend
npm install
```

### 2. Start the frontend:
```
npm run dev
```
The frontend will run on http://localhost:5173

## Database Setup

###  Make sure MongoDB is installed and running.