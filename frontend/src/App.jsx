import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='home/' element={<Home/>}/>
        <Route path = '' element = {<Signup/>}/>
      </Routes>
    </Router>

  )
}

export default App
