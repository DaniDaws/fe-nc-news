import React from "react";
import "../components-css/UsernameInput.css";

const UsernameInput = ({ currentUser, setCurrentUser }) => {
  const users = [
    { username: "tickle122", name: "Tom Tickle" },
    { username: "grumpy19", name: "Paul Grump" },
    { username: "happyamy2016", name: "Amy Happy" },
    { username: "cooljmessy", name: "Peter Messy" },
    { username: "weegembump", name: "Gemma Bump" },
    { username: "jessjelly", name: "Jess Jelly" },
  ];

  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
  };

  return (
    <div className="username-input">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        list="usernames"
        value={currentUser}
        onChange={handleUserChange}
      />
      <datalist id="usernames">
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.name}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default UsernameInput;
