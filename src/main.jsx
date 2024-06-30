import "./firebase"; //init firebase

import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from "./contexts/auth";
import { ThemeProvider } from "./contexts/theme";
import Router from './Router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Router />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
