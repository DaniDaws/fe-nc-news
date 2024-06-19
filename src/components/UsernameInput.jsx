import React from "react";
import "../components-css/UsernameInput.css";

const UsernameInput = ({ currentUser, setCurrentUser }) => {
  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
  };

  return (
    <div className="username-input">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={currentUser}
        onChange={handleUserChange}
      />
    </div>
  );
};

export default UsernameInput;
