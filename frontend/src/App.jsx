import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup'
import SignIn from './pages/signin'
import NavBar from './components/navBar'
import { AuthProvider } from './AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path = "/signup" element = {<Signup/>}/>
          </Routes>
        </main>
      </div>
      </Router>
    </AuthProvider>
  )
}

export default App
