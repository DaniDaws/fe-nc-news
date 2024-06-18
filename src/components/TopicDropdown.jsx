import React, { useState, useEffect } from "react";
import { getTopics } from "../api";
import "../components-css/TopicDropdown.css";

const TopicDropdown = ({ onSelectTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  const handleChange = (event) => {
    onSelectTopic(event.target.value);
  };

  return (
    <select onChange={handleChange} className="topic-dropdown">
      <option value="">All Topics</option>
      {topics.map((topic) => (
        <option key={topic.slug} value={topic.slug}>
          {topic.slug}
        </option>
      ))}
    </select>
  );
};

export default TopicDropdown;
