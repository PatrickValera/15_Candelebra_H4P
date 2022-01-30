import { lightTheme,darkTheme } from './themes/theme'
import { ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Home from './screens/Home.js';
import Navigation from './components/Navigation';
import Header from './components/Header';
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';
import { useState,createContext } from 'react';

const ThemeContext=createContext()
function App() {
  const [theme,setTheme]=useState('light')
  const handleThemeChange=()=>{
    if(theme==='light')setTheme('dark')
    else setTheme('light')
  }
  return (
    <ThemeProvider theme={theme==='light'?lightTheme:darkTheme}>
      <ThemeContext.Provider value={'hello'}>
      <CssBaseline />
      <Router>
      {/* <Header /> */}

        <Navigation theme={theme} setTheme={setTheme}>

          <Routes>
            <Route path='/' element={<><Home /></>} />
            <Route path='/user' element={<Outlet />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Routes>
        </Navigation>
      </Router>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
