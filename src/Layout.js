import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Books from './pages/Books'
import Character from './pages/Character'
import Houses from './pages/Houses'

function Layout() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/books" element={<Books />} />
      <Route path='/houses' element={<Houses />} />
      <Route path='/characters' element={<Character/>} />
    </Routes>
  )
}

export default Layout