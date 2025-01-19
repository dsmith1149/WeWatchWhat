import React from 'react'
import SidebarComponent from './SidebarComponent'

const DashboardProfileComponent = () => {
  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>
      
    <div className='h-screen flex-1 p-7'>
      <h1 className='center'>
        User can view their Profile here
      </h1>
    </div>
  </div>
  )
}

export default DashboardProfileComponent