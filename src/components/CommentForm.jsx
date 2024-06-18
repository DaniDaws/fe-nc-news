import React, { useState } from "react";
import "../components-css/CommentForm.css";

const CommentForm = ({ articleId, currentUser, onCommentSubmit }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "") {
      setSubmissionError("Comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    onCommentSubmit({ articleId, username: currentUser, body: newComment })
      .then(() => {
        setNewComment("");
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
