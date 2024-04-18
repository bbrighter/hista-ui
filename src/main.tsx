import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import scenes from './scenes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        {scenes.map(scene => {
          return <Route {...scene.routeProps} key={scene.name} />
        })}
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
)
