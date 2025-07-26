import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/problems");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }); // Empty dependency array means this effect runs only once on mount
  const handleClick = (problem) => {
    navigate(`/problems/${problem._id}`, { state: { problem } });
    console.log("Navigating to problem details:", problem._id);
  };
  return (
    <div>
      <h1>Problem List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            <div onClick={() => handleClick(problem)}>
              <h2>{problem.title}</h2>
              <p>{problem.description}</p>
              <p>Domain: {problem.domain}</p>
              <p>Difficulty: {problem.difficulty}</p>
              <p>Tags: {problem.tags.join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
