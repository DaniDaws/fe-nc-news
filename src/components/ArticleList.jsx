import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import "../components-css/ArticleList.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://be-nc-news-r6yn.onrender.com/api/articles")
      .then(({ data }) => {
        setArticles(data.articles);
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
