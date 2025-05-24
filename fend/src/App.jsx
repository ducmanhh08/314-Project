import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
=======
import HomePage from './page/HomePage';
import SignUp from "./page/signUp/SignUp";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
>>>>>>> 5ee82073f07db9ea0cb8d23469e9366e5c816566
}

export default App;