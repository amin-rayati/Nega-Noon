import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ProjectProvider } from './context/ProjectProvider'
import { CookiesProvider } from 'react-cookie'
import 'leaflet/dist/leaflet.css'

ReactDOM.render(
  <CookiesProvider>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
