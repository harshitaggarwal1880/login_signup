import React from "react";
// import MyComponent from './Components/MyComponent'
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";
import ProtectedRoute from "./Components/ProtectedRoute";
import EmailSent from "./Components/EmailSent";
import Shield from "./Components/Shield";
import Success from "./Components/Success";
import Loading from "./Components/Loading";

const App = () => {
  axios.defaults.withCredenstials = true;
  return (
    <Router>
      <div className="h-screen">
      <Navbar />
      <Shield>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/emailsent" element={<EmailSent />} />
          <Route exact path="/success/:tag" element={<Success />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route
            exact
            path="/content"
            element={
              <ProtectedRoute>
                <Content />
              </ProtectedRoute>
            }
          />
        </Routes>

      </Shield>
      {/* <Toaster/> */}
      <ToastContainer hideProgressBar={true} closeOnClick autoClose={1000} />
      </div>
    </Router>
  );
};

export default App;
