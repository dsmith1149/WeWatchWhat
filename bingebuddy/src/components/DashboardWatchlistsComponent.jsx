import React from 'react'
import SidebarComponent from './SidebarComponent'

const DashboardWatchlistsComponent = () => {
  return (
    <div className='flex'>
      <div>
        <SidebarComponent/>
      </div>

      <div className='h-screen flex-1 p-7'>
        <h1 className='center'>
          User can create / view their Watchlists here
        </h1>

      </div>
    </div>
  )
}

export default DashboardWatchlistsComponent
