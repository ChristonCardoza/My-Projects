import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/landing'
import Dashboard from './pages/dashboard'
import Link from './pages/link'
import Auth from './pages/auth'
import RediectLink from './pages/redirect-link'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/dashboard',
          element: <RequireAuth><Dashboard /></RequireAuth>
        },
        {
          path: '/auth',
          element: <Auth />
        },
        {
          path: '/link/:id',
          element: <RequireAuth><Link /></RequireAuth>
        },
        {
          path: '/:id',
          element: <RediectLink />
        }
      ]
    }
  ])

  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
    
  )
}

export default App
