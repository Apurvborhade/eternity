import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from 'inspector'
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
type capsuleId = string; 
interface CapsuleData {
    title: string,
    content: string,
    unlockDate: Date | undefined,
    status: string,
    files: File[]
}
export const capsulesApi = createApi({
    reducerPath: 'capsulesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/capsule", credentials: "include" }) as BaseQueryFn<string | FetchArgs, unknown, CapsuleEror, {}>,
    tagTypes: ['Capsules'],
    endpoints: (builder) => ({
        fetchCapsules: builder.query<CapsuleResult[], void>({
            query: () => ({
                url: '/getcapsule',
                method: 'GET'
            }),
            providesTags: ['Capsules'],
        }),
        fetchCapsuleDetails: builder.query<CapsuleResult, any>({
            query: (capsuleId) => ({
                url: `/capsule/${String(capsuleId)}`,
                method: "GET"
            })
        }),
        createCapsule: builder.mutation<CapsuleResult, CapsuleData>({
            query: (capsule) => {
                const formData = new FormData();
                formData.append('title', capsule.title);
                formData.append('content', capsule.content);
                if (capsule.unlockDate) {
                    formData.append('unlockDate', capsule.unlockDate.toISOString());
                }
                formData.append('status', capsule.status);

                // Append each file
                capsule.files.forEach(file => {
                    formData.append('files', file); // Make sure this matches the Multer field name
                });

                return {
                    url: '/create',
                    method: 'POST',
                    body: formData,

                };

            },
            invalidatesTags: ['Capsules'],
        })
    })
})

export const { useFetchCapsulesQuery, useCreateCapsuleMutation,useFetchCapsuleDetailsQuery } = capsulesApi