import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import TopicDropdown from "./TopicDropdown";
import SortControls from "./SortControls";
import "../components-css/ArticleList.css";

const ArticleList = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(topic || "");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    getArticles(selectedTopic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again later.");
      });
  }, [selectedTopic, sortBy, order]);

  useEffect(() => {
    setSelectedTopic(topic || "");
  }, [topic]);

  return (
    <div className="article-list">
      <TopicDropdown
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
      />
      <SortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />
      {error && <p className="error">{error}</p>}
      {articles.length > 0
        ? articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        : !error && <p>Loading articles...</p>}
    </div>
  );
};

export default ArticleList;
