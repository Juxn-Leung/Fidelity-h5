import { Outlet } from 'react-router-dom'
import AppBar from '@/components/AppBar/AppBar'
import BaseLayout from './BaseLayout'
import Navigation from '@/components/Navigation/Navigation'
const AppLayout = () => {
  return (
    <BaseLayout
      collapsible
      siderContent={<Navigation />}
      headerContent={<AppBar />}
    >
      <Outlet></Outlet>
    </BaseLayout>
  )
}
export default AppLayout
