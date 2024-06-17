import React, { useState } from "react";
import "../components-css/CommentForm.css";

const CommentForm = ({ articleId, onCommentSubmit }) => {
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "" || username.trim() === "") {
      setSubmissionError("Username and comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    onCommentSubmit({ articleId, username, body: newComment })
      .then(() => {
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

  return (
    <form onSubmit={handleSubmit} className="comment-form">
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
  );
};

export default CommentForm;
