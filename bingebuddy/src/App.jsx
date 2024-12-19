import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ListUserComponent from './components/ListUserComponent'
import UserComponent from './components/UserComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'



function App() {


  return (
    <>
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListUserComponent />}></Route>
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
