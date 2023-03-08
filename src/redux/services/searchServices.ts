import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constants';
import { RootState } from '../store';

export const searchApi = createApi({
  reducerPath: 'searchApi',
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
    searchPoll: builder.query({
      query: ({ query, page }) => ({
        url: `/api/v2/search/${query}?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazySearchPollQuery } = searchApi;
