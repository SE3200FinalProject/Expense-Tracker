SPRINT 1 (Milestone 2) - Backend Implementation and Integration
Project: Expense Tracker
Milestone: 2
Sprint Duration: Weeks 10–12

---

## TEAM MEMBERS

Member 1 - Frontend Developer: Joelle D
Member 2 - Backend Developer: Abdullah
Member 3 - Project Manager: Jim Bond

---

## REPOSITORY AND PROJECT LINKS

Team Repository (Forked): https://github.com/SE3200FinalProject/Expense-Tracker
GitHub Project Board: https://github.com/users/SE3200FinalProject/projects/1/views/1?layout_template=board


---

## SPRINT OVERVIEW

Objective:

 Build and deploy the backend server.
 Connect the database to support persistent expense tracking.
 Integrate backend APIs with the React frontend.
 Implement complete user authentication (register, login, session persistence).

---

## PROJECT BOARD STATUS (AT SUBMISSION)

Backlog:

 Future improvements: data visualization charts, password reset, category color coding.

To Do:

 Document API endpoints.
 Finalize SPRINT-1.md.
 Add loading and error UI states.

In Progress:

* Integrate React with backend.
* Finalize JWT authentication.
* Update database schema.

Done:

* Backend setup.
* REST endpoints for CRUD.
* Frontend integration.
* User authentication.

Project board link:
[https://github.com/your-team/expense-tracker/projects/1](https://github.com/your-team/expense-tracker/projects/1)

---

## BACKEND PROGRESS SUMMARY

Implemented Features:

* Backend server built with Express.js and connected to PostgreSQL (or MongoDB).
* Models and Schema:
  User: id, name, email, passwordHash, createdAt
  Expense: id, title, amount, categoryId, userId, date
  Category: id, name, color
* Authentication:
  Secure JWT-based login and registration system.
  Passwords hashed using bcrypt.
  Persistent login via localStorage on frontend.
* API Endpoints Implemented:
  POST /api/register - Register new user
  POST /api/login - Authenticate existing user
  GET /api/expenses - Fetch user’s expenses
  POST /api/expenses - Add new expense
  PUT /api/expenses/:id - Edit expense
  DELETE /api/expenses/:id - Delete expense
* Integration:
  React frontend connected via Axios to backend routes.
  User can register, log in, and add an expense.
  Expenses persist after page refresh.

---

## STAND-UP MEETING MINUTES

Week 10:
Agenda: Backend setup and database connection.

 Set up Express server and verified routes.
 Chose PostgreSQL as database, designed schema.
 Assigned frontend–backend integration tasks.
 Identified authentication as key priority.
  Decisions:
 Use JWT for authentication.
 Use Axios for API calls.

Week 11:
Agenda: Authentication and integration.

 Tested registration and login endpoints in Postman.
 Integrated login form in React frontend.
 Discussed error handling and validation.
 Added .env file for secrets.
  Action Items:
 Complete database persistence for expenses.
 Update frontend components.

Week 12:
Agenda: Testing and final documentation.

 End-to-end flow tested: register, login, add expense, refresh, data persists.
 Drafted SPRINT-1.md and updated project board.
 Identified next sprint backlog items.
  Outcome:
 ****All Milestone 2 requirements met.**** /// these are not complete
 ****Build succeeds without errors.****    /// we need your help
 ****Project ready for deployment.****    /// PLEASE SEEE E-MAIL

---

## SPRINT SUMMARY

Backend server built and connected: Complete
Database schema and relationships: Complete
REST API implemented: Complete
Frontend integrated with backend: Complete
User authentication and persistence: in progress
Project board maintained: Complete
Weekly stand-up notes included: Complete

---

## NEXT STEPS (SPRINT 2 / MILESTONE 3)

Add charts and analytics for expense visualization.
Implement password reset and profile management.
Deploy to Render or Vercel with live database.
 Conduct usability and accessibility testing.




