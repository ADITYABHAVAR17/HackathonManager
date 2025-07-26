import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProblemCard() {
  const [problem, setProblem] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <>
      {problem ? (
        <div>
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
          <p>Domain: {problem.domain}</p>
          <p>Difficulty: {problem.difficulty}</p>
          <p>Tags: {problem.tags.join(", ")}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ProblemCard;
