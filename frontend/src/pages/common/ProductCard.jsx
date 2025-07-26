import React from "react";
import { useLocation, useParams ,useNavigate} from "react-router-dom";

function ProblemCard() {
  const { id } = useParams();
    const navigate = useNavigate();
  const location = useLocation();
  const problem = location.state?.problem;

  if (!problem) {
    return <p>Error: No problem data provided.</p>; // Optional fallback if state is missing
  }
 
    // Function to handle registration (to be implemented)
    const handleRegister = () => {
        console.log("Registering for problem:", problem);
        navigate("/user",{ state: { problem } });
        // Add registration logic here
        }

  return (
    <div>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <p>Domain: {problem.domain}</p>
      <p>Difficulty: {problem.difficulty}</p>
      <p>Tags: {problem.tags.join(", ")}</p>
      <button onClick={handleRegister}>Register</button>

    </div>
  );
}

export default ProblemCard;
