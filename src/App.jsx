import { useState } from 'react'
import './App.css'
import Login from './components/login/Login'
import { AuthenticationContextProvider } from './components/services/authentication/AuthenticationContext'

function App() {

  return (
    <>
    <AuthenticationContextProvider>
      <Login/>
    </AuthenticationContextProvider>
    </>
  )
}

export default App
