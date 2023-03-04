import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [''],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/v2/auth/signin`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
