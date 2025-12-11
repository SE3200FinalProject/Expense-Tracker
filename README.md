# Expense Tracker – SE 3200 Final Project

This project is our final team project for SE 3200 (Software Design & Architecture).  
It is based on the provided React Expense Tracker and was converted into a full-stack application with a backend and database.


Live Deployment (Milestone 3)
Frontend (public Website):

https://generous-recreation-production-09ab.up.railway.app

Backend (API):
https://expense-tracker-production-9262.up.railway.app

## Current Project Status (Milestone 3)

- Backend is complete and working.
- User authentication and expenses work locally.
- A new feature was added:Budgeting Module (backend).
- Frontend UI for the Budgeting Module is still being worked on.
- Frontend and backend are both deployed on Railway.
- The full application is now live and connected to the database.

## New Feature: Budgeting Module

Users can now:
- Set a monthly budget (month, year, amount)
- View total spending for that month
- See the remaining balance
- Understand if they are over or under their budget

Backend API endpoints:
- POST /api/budgets
- GET /api/budgets?month=&year=
- GET /api/budgets/summary?month=&year=

## How to Run the Project Locally

## 1. Clone the repository
## Pull the Most Updated Code:
. Open VS Code.
. Open a terminal inside VS Code
## .Navigate to the project folder or clone it using:
 git clone https://github.com/SE3200FinalProject/Expense-Tracker
## To make sure the latest changes are on the device, run:
  git pull

## 2. Open the Project in VS Code

In VS Code, go to File → Open Folder.
  Select the main project folder: Expense-Tracker
  
## Use Two Split Terminals

This help run the backend and frontend at the same time:

Open a terminal: one for back end and the other one for fron end

Click Split Terminal to create two side-by-side terminals.

In the left terminal:
1. Move into the backend folder by typing :

CD + back end folder name
2. Install backend dependencies by tying:
npm install
3. Start the backend server By typing :
npm run dev
4.The backend should start running at:
http://localhost:5000

## 5. Start the Frontend (React Application)
In the right terminal:
1. Move into the frontend folder by typing 
cd + frontend/client folder name 
2.Install frontend dependencies by typing:
npm install

3.Start the React development server by typing: 
npm start
4. The frontend should be running at
http://localhost:3000

## 6. To Test the Application Locally

Once both terminals are running:

Backend → http://localhost:5000

Frontend → http://localhost:3000

The application can now be used locally to:

Register or log in

Add expenses

Set monthly budgets

View budget summaries
## 4. Start the Backend (Node.js / Express)

Deployment to Railway is currently not finished** due to
- Frontend still being worked on
- A team member having a serious medical emergency
- A short extension was granted by the professor

The public deployment link will be added once the app is live.

---

## Technologies Used

- React
- Node.js
- Express
- PostgreSQL
- Railway (deployment)
  -JWT Authentication






