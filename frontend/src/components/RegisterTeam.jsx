import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterTeam = () => {
  const { id: problemId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [teamData, setTeamData] = useState({
    teamName: "",
    institute: "",
  });
  const [searchEmail, setSearchEmail] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
        
        // Check if user already has a team
        if (response.data.user.teamId) {
          fetchTeamData(response.data.user.teamId);
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch team data
  const fetchTeamData = async (teamId) => {
    try {
      const response = await axios.get(`/api/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeam(response.data);
      navigate(`/submit/${problemId}`, { state: { team: response.data } });
    } catch (err) {
      console.error("Failed to fetch team data:", err);
    }
  };

  // Search for member by email
  const searchMember = async () => {
    if (!searchEmail) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      const response = await axios.get(`/api/teams/member?email=${searchEmail}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.data) {
        // Check if member is already added
        if (members.some(m => m.userId === response.data._id)) {
          toast.warning("This member is already added to your team");
          return;
        }
        
        // Check if member is the leader
        if (response.data._id === user._id) {
          toast.warning("You are the team leader and already included");
          return;
        }
        
        // Check if team already has 3 members (leader + 3 = 4 total)
        if (members.length >= 3) {
          toast.error("Team can have maximum 4 members (including you)");
          return;
        }
        
        setMembers([...members, {
          userId: response.data._id,
          email: response.data.email,
          name: response.data.name
        }]);
        setSearchEmail("");
        toast.success("Member added successfully");
      } else {
        toast.error("Member not found");
      }
    } catch (err) {
      toast.error("Failed to search member");
      console.error(err);
    }
  };

  // Register team
  const registerTeam = async () => {
    if (!teamData.teamName || !teamData.institute) {
      toast.error("Team name and institute are required");
      return;
    }

    try {
      const response = await axios.post("/api/teams/register", {
        teamName: teamData.teamName,
        institute: teamData.institute,
        members: members.map(m => ({ userId: m.userId })),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setTeam(response.data.team);
      toast.success("Team registered successfully");
      // Redirect to problem registration
      navigate(`/submit/${problemId}`, { state: { team: response.data.team } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register team");
      console.error(err);
    }
  };

  // Remove member from team (before registration)
  const removeMember = (userId) => {
    setMembers(members.filter(m => m.userId !== userId));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Team Registration</h1>
      
      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
      </div>

      {/* Team Registration Section */}
      {!team && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Register Your Team</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Team Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={teamData.teamName}
              onChange={(e) => setTeamData({...teamData, teamName: e.target.value})}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Institute</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={teamData.institute}
              onChange={(e) => setTeamData({...teamData, institute: e.target.value})}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Add Team Members (max 3)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                className="flex-1 p-2 border rounded"
                placeholder="Enter member email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={searchMember}
              >
                Add
              </button>
            </div>
            
            {members.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Team Members:</h3>
                <ul className="space-y-2">
                  {members.map((member) => (
                    <li key={member.userId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{member.name} ({member.email})</span>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeMember(member.userId)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={registerTeam}
          >
            Register Team
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterTeam;