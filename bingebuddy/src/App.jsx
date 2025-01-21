import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ListUserComponent from './components/ListUserComponent'
import UserComponent from './components/UserComponent'
import FooterComponent from './components/FooterComponent'
import HomePageComponent from './components/HomePageComponent'
import NavBarComponent from './components/NavBarComponent'
import LoginPageComponent from './components/LoginPageComponent'
import SearchMovieComponent from './components/SearchMovieComponent'
import SearchUserComponent from './components/SearchUserComponent'
import SignUpPageComponent from './components/SignUpPageComponent'
import DashboardMainComponent from './components/DashboardMainComponent'
import DashboardProfileComponent from './components/DashboardProfileComponent'
import DashboardReviewComponent from './components/DashboardReviewComponent'
import DashboardSettingsComponent from './components/DashboardSettingsComponent'
import DashboardTrendsComponent from './components/DashboardTrendsComponent'
import DashboardWatchlistsComponent from './components/DashboardWatchlistsComponent'
import CommentsComponent from './components/CommentsComponent'
import ReviewsRatingsComponent from './components/ReviewsRatingsComponent'
import DashboardCommentsComponent from './components/DashboardCommentsComponent'




function App() {

  return (
    <>
      <BrowserRouter>
      <NavBarComponent />
        <Routes>
          <Route path='/' element={<HomePageComponent />}></Route>
          <Route path='/login' element={<LoginPageComponent />}></Route>
          <Route path='/signup' element={<SignUpPageComponent />}></Route>
          <Route path='/search-movie' element={<SearchMovieComponent />}></Route>
          <Route path='/search-user' element={<SearchUserComponent />}></Route>
          <Route path='/list-users' element={<ListUserComponent />}></Route>
          <Route path='/users' element={<ListUserComponent />}></Route>
          <Route path='/add-user' element={<UserComponent />}></Route>
          <Route path='/update-user/:id' element= {<UserComponent />}></Route>
          {/* <Route path='/dashboard-main' element= {<DashboardMainComponent />}></Route> */}
          <Route path='/comments/1' element= {<CommentsComponent />}></Route>
          <Route path='/review-rate/1' element= {<ReviewsRatingsComponent />}></Route>
          <Route path='/dashboard-main/1' element= {<DashboardMainComponent />}></Route>
          <Route path='/user-profile/1' element= {<DashboardProfileComponent />}></Route>
          <Route path='/user-reviews/1' element= {<DashboardReviewComponent />}></Route>
          <Route path='/user-comments/1' element= {<DashboardCommentsComponent />}></Route>
          <Route path='/settings/1' element= {<DashboardSettingsComponent />}></Route>
          <Route path='/user-trends/1' element= {<DashboardTrendsComponent />}></Route>
          <Route path='/user-watchlists/1' element= {<DashboardWatchlistsComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App

