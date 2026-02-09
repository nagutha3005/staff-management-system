import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user.types';
import usersData from '../assets/Users.json';

interface UsersState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UsersState = {
  users: usersData.users,
  selectedUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
