import { createHashRouter } from 'react-router-dom'
import View from '@/pages/View/index'


const router = createHashRouter([
  {
    path: '/view/:id?',
    element: <View />,
  },
])

export default router
