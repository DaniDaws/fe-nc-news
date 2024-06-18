import React, { useState } from "react";
import "../components-css/CommentCard.css";
import DeleteButton from "./DeleteButton";
import VoteButtons from "./VoteButtons";

const CommentCard = ({ comment, currentUser, handleDeleteComment }) => {
  const [votes, setVotes] = useState(comment.votes);

  const handleVote = (incVotes) => {
    setVotes((prevVotes) => prevVotes + incVotes);
  };

  return (
    <div className="comment-card">
      <p>{comment.body}</p>
      <p className="comment-author">
        By {comment.author} on{" "}
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <VoteButtons votes={votes} onVote={handleVote} />
      {currentUser === comment.author && (
        <DeleteButton
          commentId={comment.comment_id}
          handleDeleteComment={handleDeleteComment}
        />
      )}
    </div>
  );
};

export default CommentCard;
