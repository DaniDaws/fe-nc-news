import React from "react";
import "../components-css/CommentCard.css";
import DeleteButton from "./DeleteButton";

const CommentCard = ({ comment, currentUser, onDelete }) => {
  return (
    <div className="comment-card">
      <p>{comment.body}</p>
      <p className="comment-author">
        By {comment.author} on{" "}
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <p className="comment-votes">Votes: {comment.votes}</p>
      {currentUser === comment.author && (
        <DeleteButton commentId={comment.comment_id} onDelete={onDelete} />
      )}
    </div>
  );
};

export default CommentCard;
