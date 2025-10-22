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











