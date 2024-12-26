import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {CssBaseline} from '@mui/material'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
