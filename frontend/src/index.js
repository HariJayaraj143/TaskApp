import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Include global styles
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
