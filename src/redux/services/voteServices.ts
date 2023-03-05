import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constants';
import { RootState } from '../store';
export const voteApi = createApi({
  reducerPath: 'voteApi',
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
  tagTypes: ['GET_VOTES'],
  endpoints: (builder) => ({
    getVotes: builder.query({
      query: ({ id }) => ({
        url: `/api/v2/votes/${id}`,
        method: 'GET',
      }),
      providesTags: ['GET_VOTES'],
    }),
    addVote: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/v2/votes`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['GET_VOTES'],
    }),
  }),
});

export const { useLazyGetVotesQuery, useAddVoteMutation } = voteApi;
