// File: frontend/src/pages/Admin/components/ProblemList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const ProblemList = ({ problems, loading, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    setError(null);
    const { success, error } = await onDelete(id);
    if (!success) {
      setError(error);
    }
    setDeletingId(null);
  };

  if (loading) return <div>Loading problems...</div>;

  return (
    <div className="problem-list">
      <h2>Problem List</h2>
      {error && <div className="error-message">{error}</div>}
      {problems?.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <ul>
          {problems.map((problem) => (
            <li key={problem._id} className="problem-item">
              <div className="problem-info">
                <h3>
                  <Link to={`/admin/problems/${problem._id}`}>{problem.title}</Link>
                </h3>
                <p>Domain: {problem.domain}</p>
                <p>Difficulty: {problem.difficulty}</p>
                <p>Tags: {problem.tags.join(", ")}</p>
              </div>
              <button
                onClick={() => handleDelete(problem._id)}
                disabled={deletingId === problem._id}
                className="delete-btn"
              >
                {deletingId === problem._id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProblemList;