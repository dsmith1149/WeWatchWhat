import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ListUserComponent from './components/ListUserComponent'
import UserComponent from './components/UserComponent'



function App() {


  return (
    <>
    {/* <h1> BingeBuddy Movie App </h1> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListUserComponent />}></Route>
          <Route path='/users' element={<ListUserComponent />}></Route>
          <Route path='/add-user' element={<UserComponent />}></Route>
          <Route path='/update-user/:id' element= {<UserComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
