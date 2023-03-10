import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constants';
import { RootState } from '../store';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [''],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page }) => ({
        url: `/api/v2/user?page=${page}`,
        method: 'GET',
      }),
    }),
    removeUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v2/user/disable/${id}`,
        method: 'DELETE',
      }),
    }),
    addPermission: builder.mutation({
      query: ({ id, permission }) => ({
        url: `/api/v2/user/permissions/assign`,
        method: 'PUT',
        body: { user_id: id, permission },
      }),
    }),
    removePermission: builder.mutation({
      query: ({ id, permission }) => ({
        url: `/api/v2/user/permissions/unassign`,
        method: 'PUT',
        body: { user_id: id, permission },
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useRemoveUserMutation,
  useAddPermissionMutation,
  useRemovePermissionMutation,
} = usersApi;
