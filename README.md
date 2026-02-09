# Staff Management System

A modern, full-featured Staff Management Web Application built with React, TypeScript, Material-UI, Redux Toolkit, and React Hook Form.

## 📋 Features

### Dashboard
- **Real-time Statistics**: Display total employees, administrators, regular users, and department count
- **Department Distribution**: Visual breakdown of employees by department
- **Gender Distribution**: Employee statistics by gender
- **Average Age Calculator**: Automatically calculated average age of all employees
- **Modern UI**: Clean, professional interface with black background and blue theme

### Employee Management
- **Employee Listing**: Comprehensive table view with pagination
- **Search Functionality**: Real-time search across name, email, department, and job title
- **Add Employee**: Form-based employee creation with full validation
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Employee Details**: Display avatar, contact info, department, job title, role, and age

## 🛠️ Tech Stack

### Mandatory Technologies (As Required)
- **React 18** with **TypeScript**
- **Redux Toolkit** for state management
- **RTK Query** for data handling
- **React Router DOM** for navigation
- **React Hook Form** with comprehensive validation
- **Material-UI (MUI)** for UI components and styling

### Additional Technologies
- **@emotion/react** and **@emotion/styled** for CSS-in-JS (MUI peer dependencies)
- **@mui/icons-material** for icons

## 🎨 Design Theme

### Color Scheme (As Required)
- **Background**: Black (#000000, #121212 for cards)
- **Text**: Blue (#2196f3 primary, #64b5f6 secondary)
- **Borders**: Blue (#1976d2)
- **Hover Effects**: Lighter blue shades

## 📁 Project Structure

```
staff-management/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── Users.json          # User data
│   ├── components/
│   │   ├── EmployeeForm.tsx    # Add/Edit employee form
│   │   └── Navigation.tsx      # Sidebar navigation
│   ├── pages/
│   │   ├── Dashboard.tsx       # Dashboard page
│   │   └── EmployeeManagement.tsx  # Employee management page
│   ├── store/
│   │   ├── hooks.ts           # Redux typed hooks
│   │   ├── store.ts           # Redux store configuration
│   │   ├── usersApi.ts        # RTK Query API
│   │   └── usersSlice.ts      # Redux slice for users
│   ├── types/
│   │   └── user.types.ts      # TypeScript interfaces
│   ├── utils/
│   │   └── theme.ts           # MUI theme configuration
│   ├── App.tsx                # Main app component
│   ├── index.tsx              # Entry point
│   └── index.css              # Global styles
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd staff-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Usage Guide

### Dashboard
- View overall statistics about employees
- See department and gender distribution
- Check average age of employees
- Quick overview of the organization

### Employee Management
1. **View Employees**: All employees are displayed in a paginated table
2. **Search**: Use the search bar to filter employees by name, email, department, or job title
3. **Add Employee**: Click "Add Employee" button and fill out the form
4. **Edit Employee**: Click the edit icon next to any employee
5. **Delete Employee**: Click the delete icon and confirm deletion

### Form Validation
The employee form includes comprehensive validation:
- **First Name**: Required, minimum 2 characters
- **Last Name**: Required, minimum 2 characters
- **Email**: Required, must be valid email format
- **Phone**: Required, valid phone number format
- **Username**: Required, minimum 3 characters
- **Age**: Required, must be between 18 and 100
- **Gender**: Required selection
- **Role**: Required (Admin or User)
- **Department**: Required selection from predefined list
- **Job Title**: Required
- **City**: Required
- **State**: Required

## 🔧 Redux State Management

### Store Structure
```typescript
{
  users: {
    users: User[],           // Array of all users
    selectedUser: User | null // Currently selected user
  },
  usersApi: {
    // RTK Query cache
  }
}
```

### Available Actions
- `addUser(user)`: Add a new employee
- `updateUser(user)`: Update existing employee
- `deleteUser(id)`: Delete employee by ID
- `setSelectedUser(user)`: Set currently selected employee

### RTK Query Endpoints
- `useGetUsersQuery()`: Fetch all users
- `useGetUserByIdQuery(id)`: Fetch user by ID

## 🎯 Key Features Implementation

### State Management with Redux Toolkit
- Centralized state management
- Type-safe actions and reducers
- Immutable state updates using Immer

### RTK Query for Data Handling
- Caching and automatic refetching
- Loading and error states
- Optimistic updates

### React Hook Form with Validation
- Controlled form inputs
- Real-time validation feedback
- Comprehensive error messages
- Type-safe form data

### Material-UI Components
- Responsive design
- Pre-built components (Tables, Forms, Cards, etc.)
- Custom theming with black/blue color scheme
- Icons from @mui/icons-material

### React Router DOM
- Client-side routing
- Navigation between Dashboard and Employee Management
- Active route highlighting

## 🧪 Testing the Application

### Test Cases
1. **Dashboard**
   - Verify all statistics are calculated correctly
   - Check department and gender distributions
   - Ensure average age calculation

2. **Employee Listing**
   - Verify all employees are displayed
   - Test pagination
   - Test search functionality

3. **Add Employee**
   - Fill out form with valid data
   - Verify validation errors for invalid inputs
   - Confirm employee is added to the list

4. **Edit Employee**
   - Open edit form for existing employee
   - Modify fields
   - Verify changes are saved

5. **Delete Employee**
   - Click delete button
   - Confirm deletion
   - Verify employee is removed

## 📦 Build for Production

```bash
npm run build
```
or
```bash
yarn build
```

This creates an optimized production build in the `build` folder.

## 🔍 Code Quality

### TypeScript
- Strict type checking enabled
- Type-safe Redux with typed hooks
- Comprehensive type definitions for all data structures

### Component Structure
- Functional components with hooks
- Clear separation of concerns
- Reusable components

### Best Practices
- Proper error handling
- Loading states
- User feedback (confirmations, success messages)
- Accessibility considerations

## 🎨 Customization

### Changing Theme Colors
Edit `src/utils/theme.ts` to modify the color scheme.

### Adding New Fields
1. Update `User` interface in `src/types/user.types.ts`
2. Update form in `src/components/EmployeeForm.tsx`
3. Update table display in `src/pages/EmployeeManagement.tsx`

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.tsx`
4. Add new Redux slices if needed in `src/store/`

## 📄 License

This project is created as part of a technical assessment.

## 👨‍💻 Developer

Created for technical assessment - Staff Management System

---

**Note**: This application uses the provided `Users.json` data and manages it through Redux Toolkit with RTK Query for optimal performance and developer experience.
