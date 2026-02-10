# Staff Management System

A web app for managing employee records built with React and TypeScript.

## What it does

This is a simple employee management application where you can view, add, edit, and delete employee information. I built it as part of a technical assessment using React, TypeScript, Redux Toolkit, and Material-UI.

## Features

**Dashboard**
- See total employee count
- View breakdown by department and gender
- Quick stats overview

**Employee Management**
- Full list of all employees with search
- Add new employees through a form
- Edit existing employee details
- Delete employees (with confirmation)
- Right-click on any row for quick actions
- Click the eye icon to see complete employee details

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- Material-UI for the interface
- React Hook Form for forms and validation
- React Router for navigation

## Getting Started

### Prerequisites

You'll need Node.js installed (I used v18, but v16+ should work fine).

### Installation

```bash
# Clone the repo
git clone https://github.com/nagutha3005/staff-management-system.git
cd staff-management-system

# Install dependencies
npm install --force

Use Command Promt or git Bash

# Start the dev server
npm start
```

**Note:** I had to use `--force` because of some peer dependency conflicts between Material-UI and React 18. Everything works fine though!

The app should open automatically at `http://localhost:3000`

## How to Use

### Dashboard
Just navigate to the home page to see the stats. The counts update automatically when you add or remove employees.

### Managing Employees

**Adding someone:**
1. Click "Add Employee" button
2. Fill out the form (all fields are required)
3. Hit submit

**Editing:**
- Click the blue pencil icon next to any employee, or
- Right-click on the row and select "Edit"

**Deleting:**
- Click the red trash icon, or
- Right-click and select "Delete"
- Confirm when prompted

**Viewing details:**
- Click the green eye icon, or
- Right-click and select "View Details"

This shows ALL the employee information in a nice organized dialog.

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/            # Main pages (Dashboard, Employee Management)
├── store/            # Redux setup
├── types/            # TypeScript interfaces
└── utils/            # Theme and utilities
```

## Known Issues

- Need to use `npm install --force` due to dependency conflicts (doesn't affect functionality)
- Currently using mock data from Users.json

## Future Improvements

Things I'd like to add if I had more time:
- Export to CSV/Excel
- Bulk delete
- Dark/light mode toggle
- More filtering options
- Profile picture uploads

## Development Notes

I used Redux Toolkit because it's way cleaner than vanilla Redux. The `usersSlice` handles all the CRUD operations, and I set up RTK Query even though we're using local JSON data (would be easy to swap in a real API later).

The theme uses a black background with blue text as specified in the requirements. All the colors are defined in `utils/theme.ts` if you want to customize.

## Build

```bash
npm run build
```

Creates an optimized production build in the `build` folder.


## Contact

Feel free to reach out if you have questions!
Nagutha Mohamed Ansari
---
