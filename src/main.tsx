import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import scenes from './scenes'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          {scenes.map(scene => {
            return <Route {...scene.routeProps} key={scene.name} />
          })}
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
)
