import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    
    <div className='flex flex-col gap-5 items-center w-full h-full'>
        <h1>Layout</h1>
        <Outlet />
    </div>
  )
}

export default Layout