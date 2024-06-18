import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsernameInput from "./components/UsernameInput";

function App() {
  const [currentUser, setCurrentUser] = useState("grumpy19");

  return (
    <>
      <UsernameInput
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/articles/:articleId"
          element={<ArticlePage currentUser={currentUser} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
