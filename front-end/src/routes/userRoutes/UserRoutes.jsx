import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegisterPage from '../../pages/UserRegisterPage';
import UserLoginPage from '../../pages/UserLoginPage';
import { useSelector } from 'react-redux';
import UserHomePage from '../../pages/UserHomePage';


const ProtectedRoute = ({ children }) => {
const isAuthenticated = useSelector((state) => state.userLogin.userInfo);
  return isAuthenticated ? (
    children
  ) : (
    // Redirect to login page if not authenticated
    <Navigate to="/admin/" replace={true} />
  );
};


 const ConditionalRendering = () => {
      const isAuthenticated = useSelector(
        (state) => state.userLogin.userInfo
      );

   return isAuthenticated ? (
     // Render the Home component if authenticated
     <UserHomePage />
   ) : (
     // Render the UserLoginPage component if not authenticated
     <UserLoginPage />
   );
 };



const UserRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/" element={<ConditionalRendering />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
              
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default UserRoutes
