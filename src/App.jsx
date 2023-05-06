import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
