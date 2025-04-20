import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_TAGS, API_PATHS } from "../constants/api";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: 'adminapi',
    tagTypes: Object.values(API_TAGS),
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => API_PATHS.USER(id),
            providesTags: [API_TAGS.USER]
        }),
        getProducts: build.query({
            query: () => API_PATHS.PRODUCTS,
            providesTags: [API_TAGS.PRODUCTS],
        }),
        getCustomers: build.query({
            query: () => API_PATHS.CUSTOMERS,
            providesTags: [API_TAGS.CUSTOMERS],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: API_PATHS.TRANSACTIONS,
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: [API_TAGS.TRANSACTIONS],
        }),
        getGeography: build.query({
            query: () => API_PATHS.GEOGRAPHY,
            providesTags: [API_TAGS.GEOGRAPHY],
        }),
        getSales: build.query({
            query: () => API_PATHS.SALES,
            providesTags: [API_TAGS.SALES],
        }),
        getAdmins: build.query({
            query: () => API_PATHS.ADMINS,
            providesTags: [API_TAGS.ADMINS],
        }),
        getUserPerformance: build.query({
            query: (id) => API_PATHS.PERFORMANCE(id),
            providesTags: [API_TAGS.PERFORMANCE],
        }),
        getDashboard: build.query({
            query: () => API_PATHS.DASHBOARD,
            providesTags: [API_TAGS.DASHBOARD],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery
} = api;