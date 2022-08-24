import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.TMDB_KEY;
const page = 1

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get movies by [Type]
    getMovies: builder.query({
      query: () => {
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
      }
    })
  }),
})