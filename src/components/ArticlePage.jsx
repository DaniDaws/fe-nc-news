import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotes,
  postComment,
  deleteComment,
} from "../api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import "../components-css/ArticlePage.css";

const ArticlePage = ({ currentUser }) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setError("Failed to fetch article. Please try again later.");
      });

    getCommentsByArticleId(articleId)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setError("Failed to fetch comments. Please try again later.");
      });
  }, [articleId]);

  const handleVote = (incVotes) => {
    setVotes((prevVotes) => prevVotes + incVotes);

    patchArticleVotes(articleId, incVotes).catch((error) => {
      console.error("Error updating votes:", error);
      setError("Failed to update votes. Please try again later.");
      setVotes((prevVotes) => prevVotes - incVotes);
    });
  };

  const handleCommentSubmit = ({ articleId, username, body }) => {
    return postComment(articleId, { username, body }).then((comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
    });
  };

  const handleDeleteComment = (commentId) => {
    return deleteComment(commentId).then(() => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    });
  };

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
      <p className="article-page-body">{article.body}</p>
      <div className="article-votes">
        <button onClick={() => handleVote(1)}>Upvote</button>
        <span>{votes} votes</span>
        <button onClick={() => handleVote(-1)}>Downvote</button>
      </div>

      <h3>Comments</h3>
      <p className="logged-in-as">logged in as {currentUser}</p>
      <CommentForm
        articleId={articleId}
        currentUser={currentUser}
        onCommentSubmit={handleCommentSubmit}
      />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            currentUser={currentUser}
            handleDeleteComment={handleDeleteComment}
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default ArticlePage;
