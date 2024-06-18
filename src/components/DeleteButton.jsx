import React, { useState } from "react";
import "../components-css/DeleteButton.css";

const DeleteButton = ({ commentId, handleDeleteComment }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    handleDeleteComment(commentId).catch((error) => {
      console.error("Error deleting comment:", error);
      setIsDeleting(false);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="delete-button"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
