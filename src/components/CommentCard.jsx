import React from "react";
import "../components-css/CommentCard.css";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <p>{comment.body}</p>
      <p className="comment-author">
        By {comment.author} on {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <p className="comment-votes">Votes: {comment.votes}</p>
    </div>
  );
};

export default CommentCard;