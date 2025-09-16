import { Navigate, createHashRouter } from 'react-router-dom'
import View from '@/pages/View/index'


const router = createHashRouter([
  {
    path: '/view/:id?',
    element: <View />,
  },
  {
    path: '/',
    element: <Navigate to="/view" replace />,
  },
])

export default router
