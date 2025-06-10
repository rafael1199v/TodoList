import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='flex flex-col gap-5 items-center w-full h-screen'>
        <Outlet />
      </div>
    </div>
    
  )
}

export default Layout