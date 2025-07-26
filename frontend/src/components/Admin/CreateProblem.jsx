// File: frontend/src/pages/Admin/components/CreateProblem.jsx
import { useState } from "react";

const CreateProblem = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    difficulty: "Medium",
    tags: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const problemData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    const { success, error } = await onCreate(problemData);
    if (success) {
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        domain: "",
        difficulty: "Medium",
        tags: "",
      });
    } else {
      setError(error);
    }
    setSubmitting(false);
  };

  return (
    <div className="create-problem">
      <h2>Create New Problem</h2>
      {success && (
        <div className="success-message">
          Problem created successfully!
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
          />
        </div>

        <div className="form-group">
          <label>Domain</label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., algorithm, data structure, math"
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Problem"}
        </button>
      </form>
    </div>
  );
};

export default CreateProblem;