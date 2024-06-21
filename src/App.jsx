import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsernameInput from "./components/UsernameInput";
import TopicPage from "./components/TopicPage";
import NotFoundPage from "./components/NotFoundPage";
import { ThemeProvider } from "./components/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [currentUser, setCurrentUser] = useState("grumpy19");

  return (
    <ThemeProvider>
      <UsernameInput
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Header />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/articles/:articleId"
          element={<ArticlePage currentUser={currentUser} />}
        />
        <Route path="/topics/:topic" element={<TopicPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
