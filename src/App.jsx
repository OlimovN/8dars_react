import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const navigate=useNavigate();

  function ProtectedRoute({isAuthenticated, children}){
    if(!isAuthenticated){
      navigate("/login")
    }

    return children;
  }

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/' element={<ProtectedRoute isAuthenticated={true}><Home></Home></ProtectedRoute>}></Route>
    </Routes>
    </>
  )
}

export default App
