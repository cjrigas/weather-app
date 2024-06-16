// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CurrentWeatherResponse, SearchResponse } from './types'

const key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    search: builder.query<SearchResponse, string>({
      query: (city) => `/search.json?key=${key}&q=${city}`,
    }),
    current: builder.query<CurrentWeatherResponse, { city: string, aqi: 'yes' | 'no' }>({
      query: ({ city, aqi }) => `/current.json?key=${key}&q=${city}&aqi=${aqi}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchQuery,
  useCurrentQuery,
  useLazyCurrentQuery,
} = weatherApi
