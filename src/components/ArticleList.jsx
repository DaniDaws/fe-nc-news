import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import "../components-css/ArticleList.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again later.");
      });
  }, []);

  return (
    <div className="article-list">
      {error && <p className="error">{error}</p>}
      {articles.length > 0
        ? articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))
        : !error && <p>Loading articles...</p>}
    </div>
  );
};

export default ArticleList;
