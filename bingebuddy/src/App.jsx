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



function App() {

  return (
    <>
      <BrowserRouter>
      <NavBarComponent />
        <Routes>
          <Route path='/' element={<HomePageComponent />}></Route>
          <Route path='/login' element={<LoginPageComponent />}></Route>
          <Route path='/search-movie' element={<SearchMovieComponent />}></Route>
          <Route path='/search-user' element={<SearchUserComponent />}></Route>
          <Route path='/list-users' element={<ListUserComponent />}></Route>
          <Route path='/users' element={<ListUserComponent />}></Route>
          <Route path='/add-user' element={<UserComponent />}></Route>
          <Route path='/update-user/:id' element= {<UserComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App

