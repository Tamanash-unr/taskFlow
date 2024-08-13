import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { Home, SignIn, SignUp } from './pages'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Toaster 
        position='bottom-center'
        toastOptions={{
          
        }}
      />
    </div>
    
  )
}

export default App
