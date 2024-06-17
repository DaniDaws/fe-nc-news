import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotes,
  postComment,
} from "../api";
import CommentCard from "./CommentCard";
import "../components-css/ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "" || username.trim() === "") {
      setSubmissionError("Username and comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    postComment(articleId, { username, body: newComment })
      .then((comment) => {
        setComments((prevComments) => [comment, ...prevComments]);
        setNewComment("");
        setUsername("");
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setSubmissionError("Failed to post comment. Please try again later.");
        setIsSubmitting(false);
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
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          required
        />
        <button type="submit" disabled={isSubmitting}>
          Submit Comment
        </button>
        {submissionError && <p className="error">{submissionError}</p>}
      </form>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default ArticlePage;
