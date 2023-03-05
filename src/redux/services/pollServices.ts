import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constants';
import { RootState } from '../store';

export const pollApi = createApi({
  reducerPath: 'pollApi',
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
  tagTypes: ['GET_POLL'],
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: ({ page }) => ({
        url: `/api/v2/polls?page=${page}`,
        method: 'GET',
      }),
    }),
    getPoll: builder.query({
      query: ({ id }) => ({
        url: `/api/v2/polls/${id}`,
        method: 'GET',
      }),
      providesTags: ['GET_POLL'],
    }),
    addPoll: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/v2/polls`,
        method: 'POST',
        body: payload,
      }),
    }),
    deletePoll: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v2/polls/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetPollsQuery,
  useLazyGetPollQuery,
  useAddPollMutation,
  useDeletePollMutation,
} = pollApi;
