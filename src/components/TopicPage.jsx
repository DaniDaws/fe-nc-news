import React from "react";
import ArticleList from "./ArticleList";
import { useParams } from "react-router-dom";

const TopicPage = () => {
  const { topic } = useParams();

  return (
    <div>
      <h2>{topic.charAt(0).toUpperCase() + topic.slice(1)} Articles</h2>
      <ArticleList />
    </div>
  );
};

export default TopicPage;
