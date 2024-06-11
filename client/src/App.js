import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJWToken } from './util/helperFunc';
import { userActions } from './store/userSlice';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Single from './pages/Single/Single';
import ViewAll from './pages/ViewAll/ViewAll';
import { Container } from '@mui/material';
import NoMatch from './pages/NoMatch/NoMatch';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

// Utility function to check if token is expired
const isTokenExpired = (token) => {
  const { exp } = decodeJWToken(token);
  return exp * 1000 < Date.now();
};


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLog.user);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      const userDoc = decodeJWToken(token); // decode jwt token
      dispatch(
        userActions.login({
          user: userDoc,
        })
      );
    } else {
      localStorage.removeItem('token'); 
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Container sx={{mt: 5}}>
          <Routes>
            <Route path='/' exact element={<Home />} />
            
            {user ? <>
              <Route path='/all' element={<ViewAll />} />
              <Route path='/single/:id' element={<Single />} />
              <Route path='/edit/:id' element={<SignUp />} />
            </> : <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            </>} 
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
