
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Users from './pages/Users';
import { useEffect } from 'react';
import { updateUser } from './utils/slices/userSlice';
import Attendence from './pages/Attendence';
import EmployeeAttendance from './pages/EmployeeAttendence';


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userData = {
        name: payload.employee_id,
        email: "",
        role: payload.role
      };
      //store it in redux
      dispatch(updateUser(userData));
    }
  }, [])

  return (
    <>
      <Router>
      <Routes>
        <Route path="/login" element={ user.isLogin ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={ user.isLogin ? <Home/> : <Navigate to="/login" />}>
        
           <Route path="users" element={ <Users/> } />
           <Route path="" element={ <Attendence/> } />
           <Route path="attendance/:id" element={ <EmployeeAttendance/> } />

        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
