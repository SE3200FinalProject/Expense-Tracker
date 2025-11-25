10/12/2025
Group formed
Group Members; Jim Bond, Joelle Drouillard, Abdulhameed Ba Hakim

10/13/2025 
Created GitHub acct for project
GitHub URL: 
https://github.com/SE3200FinalProject/Expense-Tracker

Forked ReevesFernandewz Expense-Trackewer to SE3200FinalProject

Created GitHub Project Board
GitHub Project Board URL: 
https://github.com/users/SE3200FinalProject/projects/1/views/1?layout_template=board

Link to Google Drive https://docs.google.com/document/d/1PFCoaAa8sbniTyRTxZ0_tkY4Hn4k11Y_NDjqEXcKSWQ/edit?usp=sharing
Database Schema 
Users Table:
Field
Data Type
Purpose
Id
UUID (PK)
Unique identifier for each user
name
text (optional)
Display name of the user’s profile
Email
text (unique, required)
User’s login email
password_hash
text (required)
Encrypted password for security
created_at
timestamptz
When the account was created
updated_at
timestamptz
When the user record was last updated

 
Categories Table:
Field
Data Type
Purpose
Id
UUID (PK)
Unique identifier for each category
user_id
UUID (FK --> users.id, required)
Identifies which user created this category
name
text (required)
Category name (e.g. Food, Bills, Travel)
created_at
timestamptz
When the category was created
updated_at
timestamptz
When the category record was last updated

 
 
Expenses tables:
Field
Data Type
Purpose
Id                      	
UUID (PK)
Unique identifier for each expense
user_id
UUID (FK --> users.id, required)
Connects the expense to its user
category_id
UUID (FK → categories.id, NULL)
Links an expense to a specific category (optional)
title
text (required)
Expense title (e.g. “ Car”)
amount
numeric(12,2)
Expense amount in dollars
date
Date DDMMYYYY
Date when the expense occurred
created_at
timestamptz
When the expense was created
updated_at
timestamptz
When expense was last updated

REST API Spec.
Auth:
POST /api/v1/auth/register → 201
POST /api/v1/auth/login → 200 (returns JWT cookie or token)
POST /api/v1/auth/logout → 204
GET /api/v1/auth/me → 200 (current user)
Categories:
GET /api/v1/categories
POST /api/v1/categories
PUT /api/v1/categories/:id
DELETE /api/v1/categories/:id
Expenses:
GET /api/v1/expenses?from=&to=&category=&q=
POST /api/v1/expenses
PUT /api/v1/expenses/:id
DELETE /api/v1/expenses/:id
Stats (for dashboards/new features):
GET /api/v1/analytics/summary?from=&to= (totals by category / month)
All non-auth routes require JWT middleware (req.user.id scopes data to that user).












