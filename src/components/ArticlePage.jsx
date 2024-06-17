import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components-css/ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://be-nc-news-r6yn.onrender.com/api/articles/${articleId}`)
      .then(({ data }) => {
        setArticle(data.article);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setError("Failed to fetch article. Please try again later.");
      });
  }, [articleId]);

  if (error) return <p className="error">{error}</p>;
  if (!article) return <p>Loading article...</p>;

  return (
    <div className="article-page">
      <h2>{article.title}</h2>
      <p>
        By {article.author} on{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <img src={article.article_img_url} alt={article.title} />
      <p>{article.body}</p>
    </div>
  );
};

export default ArticlePage;
