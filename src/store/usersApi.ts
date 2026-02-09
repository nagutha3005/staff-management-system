import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/user.types';
import usersData from '../assets/Users.json';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: () => ({ data: usersData.users }),
      providesTags: ['Users'],
    }),
    getUserById: builder.query<User | undefined, number>({
      queryFn: (id) => {
        const user = usersData.users.find((u) => u.id === id);
        return user ? { data: user } : { error: 'User not found' };
      },
      providesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
