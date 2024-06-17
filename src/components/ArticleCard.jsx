import React from "react";
import "../components-css/ArticleCard.css";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-img"
      />
      <div className="article-card-content">
        <h2>{article.title}</h2>
        <p className="author">By {article.author}</p>
        <p className="date">
          on {new Date(article.created_at).toLocaleDateString()}
        </p>
        <p className="topic">Topic: {article.topic}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
