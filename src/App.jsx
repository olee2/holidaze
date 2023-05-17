import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import UserProfile from "./pages/Profile";
import Venue from "./pages/Venue";
import "../src/styles/styles.css";

function App() {
  return (
    <div>
      <Router>
        {" "}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="venue/:id" element={<Venue />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
