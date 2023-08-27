import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import India from "./pages/India/India";
import News from "./pages/News/News";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/india" exact element={<India />} />
          <Route path="/news" exact element={<News />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
