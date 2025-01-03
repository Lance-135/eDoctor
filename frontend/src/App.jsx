import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
import SignIn from './pages/signin'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='home/' element={<Home/>}/>
        <Route path = '' element = {<Signup/>}/>
        <Route path = 'signIn/' element = {<SignIn/>}/>
      </Routes>
    </Router>

  )
}

export default App
