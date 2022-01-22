import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home';
import Navigation from './components/Navigation';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Header /> */}
      <Navigation>
        <Router>
          <Routes>
            <Route path='/' element={<><Home /><Home /><Home /></>} />
            {/* <Route path='/dashboard' element={</>}/> */}
          </Routes>
        </Router>
      </Navigation>
    </ThemeProvider>
  );
}

export default App;
