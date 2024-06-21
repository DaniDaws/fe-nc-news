import React from "react";
import "../components-css/VoteButtons.css";
import thumbsUpIcon from "../assets/thumbs-up.png";
import thumbsDownIcon from "../assets/thumbs-down.png";

const VoteButtons = ({ votes, onVote }) => {
  return (
    <div className="vote-buttons">
      <button onClick={() => onVote(1)} className="vote-button">
        <img src={thumbsUpIcon} alt="Thumbs Up" className="vote-icon" />
      </button>
      <span className="vote-count">{votes}</span>
      <button onClick={() => onVote(-1)} className="vote-button">
        <img src={thumbsDownIcon} alt="Thumbs Down" className="vote-icon" />
      </button>
    </div>
  );
};

export default VoteButtons;
