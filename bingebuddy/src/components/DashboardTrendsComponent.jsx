import React from 'react'
import SidebarComponent from './SidebarComponent'

const DashboardTrendsComponent = () => {
  return (
    <div className='flex'>
      <div>
        <SidebarComponent />
      </div>
      
      <div className='h-screen flex-1 p-7'>
        <h1 className='center'>
          User can check out their trends as graphs / charts here
        </h1>
      </div>

    </div>
  )
}

export default DashboardTrendsComponent