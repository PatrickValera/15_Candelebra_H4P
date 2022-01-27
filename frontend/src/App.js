import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Home from './screens/Home.js';
import Navigation from './components/Navigation';
import Header from './components/Header';
import './App.css';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Header /> */}
      <Navigation>

        <Router>
          <Routes>
            <Route path='/' element={<><Home /></>} />
            <Route path='/user' element={<Outlet/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
            </Route>
          </Routes>
        </Router>

      </Navigation>
    </ThemeProvider>
  );
}

export default App;
