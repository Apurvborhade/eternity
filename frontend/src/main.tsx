
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page.tsx'
import Root from './routes/Root.tsx'
import SignUp from './routes/SignUp.tsx'
import Login from './routes/Login.tsx'
import Dashboard from './routes/Dashboard.tsx'
import CreateCapsule from './routes/CreateCapsule.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store.ts'
import UpdateCapsule from './routes/UpdateCapsule.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Root />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/capsule/create-capsule',
    element: <CreateCapsule />
  },
  {
    path: '/capsule/update-capsule',
    element: <UpdateCapsule />
  },
])
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
