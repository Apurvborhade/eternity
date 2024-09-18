import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface CapsuleResult {
    _id: string,
    title: string,
    content: string,
    unlockDate: string,
    createdBy: string,
    status: string,
    media: string[],
    createdAt: string[],
    updatedAt: string[],
    __v: number
}
interface CapsuleEror {
    data: {
        success: string,
        status: string,
        message: string,
        stack: string
    }
}
interface CapsuleData {
    title:string,
    content:string,
    unlockDate:Date | undefined,
    status:string
}
export const capsulesApi = createApi({
    reducerPath: 'capsulesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/capsule", credentials: "include" }) as BaseQueryFn<string | FetchArgs, unknown, CapsuleEror, {}>,
    tagTypes:['Capsules'],
    endpoints: (builder) => ({
        fetchCapsules: builder.query<CapsuleResult[], void>({
            query: () => ({
                url: '/getcapsule',
                method: 'GET'
            }),
            providesTags: ['Capsules'],
        }),
        createCapsule: builder.mutation<CapsuleResult, CapsuleData>({
            query: (capsule) => ({
                url: '/create',
                method: 'POST',
                body: capsule
            }),
            invalidatesTags: ['Capsules'],  
        })
    })
})

export const { useFetchCapsulesQuery,useCreateCapsuleMutation } = capsulesApi