import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import TopicDropdown from "./TopicDropdown";
import "../components-css/ArticleList.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    getArticles(selectedTopic)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again later.");
      });
  }, [selectedTopic]);

  return (
    <div className="article-list">
      <TopicDropdown onSelectTopic={setSelectedTopic} />
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
