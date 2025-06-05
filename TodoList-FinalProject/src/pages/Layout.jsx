import React from 'react'

function Layout({ children }) {
  return (
    <div className='flex flex-col gap-5 items-center w-full h-full'>
        { children }
    </div>
  )
}

export default Layout