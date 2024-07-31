import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Signup'
import Login from './Signin'
import DashBoard from './DashBoard'
import Profile from './Profile'
import ViewBook from './ViewBook'


function Router() {
  return (
<BrowserRouter>
<Routes>

<Route path='/' element={<SignUp/>}/>
<Route path='login' element={<Login/>}/>
<Route path='/dash' element={<DashBoard/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/view' element={<ViewBook/>}/>
</Routes>

</BrowserRouter>
  )
}

export default Router