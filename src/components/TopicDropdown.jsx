import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../api";
import "../components-css/TopicDropdown.css";

const TopicDropdown = ({ selectedTopic, onSelectTopic }) => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  const handleChange = (event) => {
    const topic = event.target.value;
    onSelectTopic(topic);
    if (topic) {
      navigate(`/topics/${topic}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <select
      value={selectedTopic}
      onChange={handleChange}
      className="topic-dropdown"
    >
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
