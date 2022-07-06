import React, { useState, useCallback, useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';
import Layout from './components/Layout'
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import './App.css';
import Home from './components/Home/Home';
import LinkPage from './components/LinkPage';

function App() {

  const navigate = useNavigate();
  const [token, setToken] = useState(false);
  const [userName, setUserName] = useState(false);


  const loggedIn = localStorage.getItem('isLoggedIn');
  const role = localStorage.getItem('role');




  let routes;
  return (
    <Routes>
      <Route path="/" element={loggedIn ?
        (role === "Teacher")
          ? <Teacher />
          : (role === "Student")
            ? <Student />
            : alert("No matching user")
        : <Home />} />

      { /* Public Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='/home' element={<Home />} />

      { /* Protected Routes  */}

      <Route element={<RequireAuth allowedRoles={["Teacher"]} />}>
        <Route path='/TeacherDash' element={<Teacher />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["Student"]} />}>
        <Route path='/StudentDash' element={<Student />} />
      </Route>

      { /* Catch Errors  */}
      <Route path='/#' element={<Missing />} />
    </Routes >
  )

  /*if (token) {
    routes = (
      <div>
        <Routes>
          <Route path='/dashboard' element={<DashBoard />}></Route>
          <Route path='/CheckAuth' element={<CheckAuth />}></Route>
        </Routes>
      </div>
    )
  }
  else {
    routes = (
      <div>
        <Routes>
          <Route path='/' element={<Login login={login} />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </div>
    )
  }
  return (
    <main>{routes}</main>
  );*/
}

export default App;