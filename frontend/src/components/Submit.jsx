import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SubmitSolution = () => {
  const { id: problemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(location.state?.team || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submission, setSubmission] = useState({
    ideaSummary: "",
    githubLink: "",
    pptLink: "",
    videoLink: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  // Fetch user data and check registration status
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user data
        const userResponse = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(userResponse.data.user);

        // If team wasn't passed in state, fetch it
        if (!team && userResponse.data.user.teamId) {
          const teamResponse = await axios.get(
            `/api/teams/${userResponse.data.user.teamId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setTeam(teamResponse.data);
        }

        // Check if team is already registered for this problem
        if (team || userResponse.data.user.teamId) {
          const teamId = team?._id || userResponse.data.user.teamId;
          const submissionResponse = await axios.get(
            `/api/submissions?teamId=${teamId}&problemId=${problemId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (submissionResponse.data && submissionResponse.data.length > 0) {
            setSubmission(submissionResponse.data[0]);
            setIsRegistered(true);
          }
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [problemId, team]);

  // Register team for the problem
  const registerForProblem = async () => {
    try {
      const response = await axios.post(
        "/api/submissions/register",
        { problemId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubmission(response.data.submission);
      setIsRegistered(true);
      toast.success("Registered for problem successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to register for problem"
      );
      console.error(err);
    }
  };

  // Submit solution
  const submitSolution = async () => {
    if (!submission.ideaSummary || !submission.githubLink) {
      toast.error("Idea summary and GitHub link are required");
      return;
    }

    try {
      const response = await axios.put(
        "/api/submissions/submit",
        {
          ideaSummary: submission.ideaSummary,
          githubLink: submission.githubLink,
          pptLink: submission.pptLink,
          videoLink: submission.videoLink,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubmission(response.data.submission);
      toast.success("Solution submitted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit solution");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!team) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">You need to register a team first.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate(`/problem/${problemId}`)}
        >
          Go to Team Registration
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Problem Submission</h1>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>

      {/* Team Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Team Information</h2>
        <p>
          <span className="font-medium">Team Name:</span> {team.teamName}
        </p>
        <p>
          <span className="font-medium">Institute:</span> {team.institute}
        </p>
      </div>

      {/* Problem Registration Section */}
      {!isRegistered && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Register for Problem</h2>
          <p className="mb-4">
            You need to register your team for this problem before submitting a
            solution.
          </p>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={registerForProblem}
          >
            Register Team for This Problem
          </button>
        </div>
      )}

      {/* Solution Submission Section */}
      {isRegistered && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Submit Your Solution</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Idea Summary *</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="5"
              value={submission.ideaSummary}
              onChange={(e) =>
                setSubmission({ ...submission, ideaSummary: e.target.value })
              }
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              GitHub Repository Link *
            </label>
            <input
              type="url"
              className="w-full p-2 border rounded"
              value={submission.githubLink}
              onChange={(e) =>
                setSubmission({ ...submission, githubLink: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              PPT Link (Optional)
            </label>
            <input
              type="url"
              className="w-full p-2 border rounded"
              value={submission.pptLink}
              onChange={(e) =>
                setSubmission({ ...submission, pptLink: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Video Demo Link (Optional)
            </label>
            <input
              type="url"
              className="w-full p-2 border rounded"
              value={submission.videoLink}
              onChange={(e) =>
                setSubmission({ ...submission, videoLink: e.target.value })
              }
            />
          </div>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={submitSolution}
            disabled={submission.isSubmitted}
          >
            {submission.isSubmitted ? "Already Submitted" : "Submit Solution"}
          </button>

          {submission.isSubmitted && (
            <p className="mt-2 text-green-600">
              Submitted on: {new Date(submission.submittedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitSolution;
