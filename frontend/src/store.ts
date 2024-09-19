import { configureStore } from '@reduxjs/toolkit'
import { usersApi } from '@/services/userApi'

import userReducer from '@/features/user/userSLice'
import capsuleReducer from '@/features/capsules/capsuleSlice'
import { capsulesApi } from './services/capsuleApi'

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [capsulesApi.reducerPath]: capsulesApi.reducer,
        user: userReducer,
        capsule:capsuleReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware,capsulesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>