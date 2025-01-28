import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UserError {
    data: {
        success: string,
        status: string,
        message: string,
        stack: string
    }
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://eternity-backend.onrender.com/api/v1/user", credentials: "include" }) as BaseQueryFn<string | FetchArgs, unknown, UserError, {}>,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
            })
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        }),
        logoutUser: builder.mutation<Object, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = usersApi;