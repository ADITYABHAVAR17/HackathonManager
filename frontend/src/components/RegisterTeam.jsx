import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Users, 
  Building, 
  Mail, 
  User, 
  Plus, 
  X,
  Sparkles,
  AlertCircle,
  Loader,
  ExternalLink,
  Award,
  Layers
} from "lucide-react";

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
  const [searchLoading, setSearchLoading] = useState(false);

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

    setSearchLoading(true);
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
    } finally {
      setSearchLoading(false);
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Loading Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-purple-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-20 w-8 h-8 border-2 border-cyan-400/40 rounded-full animate-ping"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/20 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-300 border-t-transparent mx-auto mb-6"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 animate-pulse" size={32} />
            </div>
            <p className="text-white text-xl font-medium animate-pulse">Loading team portal...</p>
            <p className="text-purple-200 mt-2">Preparing your team space</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-red-900 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Error Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-500/5 via-transparent to-red-500/5"></div>
          <div className="absolute top-16 left-16 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-16 right-16 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          
          {/* Error-themed shapes */}
          <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-rose-400/30 rotate-45 animate-bounce delay-300"></div>
          <div className="absolute bottom-1/3 left-1/4 w-10 h-10 border-2 border-red-400/20 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-rose-300/20 animate-fadeIn relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <AlertCircle className="text-rose-300 mx-auto mb-6 animate-bounce" size={64} />
            <div className="text-rose-100 text-xl font-medium">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Enhanced Main Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-indigo-800/20 to-blue-800/30"></div>
        
        {/* Large background orbs with enhanced gradients */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
        {/* Additional accent orbs */}
        <div className="absolute top-10 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-2500"></div>
        
        {/* Geometric shapes for visual interest */}
        <div className="absolute top-32 right-32 w-16 h-16 border-2 border-purple-400/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-40 left-40 w-12 h-12 border-2 border-cyan-400/25 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-blue-400/25 rotate-45 animate-pulse delay-1200"></div>
        
        {/* Diagonal light streaks */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent transform rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent transform -rotate-12 delay-700"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Enhanced Floating Particles System */}
      {[...Array(25)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            background: i % 4 === 0 ? 'rgba(147, 51, 234, 0.3)' : 
                       i % 4 === 1 ? 'rgba(56, 189, 248, 0.3)' :
                       i % 4 === 2 ? 'rgba(236, 72, 153, 0.3)' : 'rgba(34, 197, 94, 0.3)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            filter: 'blur(0.5px)'
          }}
        ></div>
      ))}

      {/* Twinkling stars effect */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}
        ></div>
      ))}

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className="text-center mb-12 animate-fadeInUp relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl"></div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 relative z-10">
              Team Registration
            </h1>
            <p className="text-purple-200 text-lg">Create or join a team to participate in the challenge</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Info Card */}
            <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slideInLeft hover:bg-purple-900/70 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl"></div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center group-hover:scale-105 transition-transform duration-300 relative z-10">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-2xl mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                Your Profile
              </h2>
              <div className="space-y-4 relative z-10">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-purple-300/30">
                  <p className="text-purple-200 text-sm mb-1 flex items-center">
                    <User size={14} className="mr-1" />
                    Name
                  </p>
                  <p className="text-white font-semibold">{user?.name}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-purple-300/30">
                  <p className="text-purple-200 text-sm mb-1 flex items-center">
                    <Mail size={14} className="mr-1" />
                    Email
                  </p>
                  <p className="text-white font-semibold text-sm">{user?.email}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-purple-300/30">
                  <p className="text-purple-200 text-sm mb-1 flex items-center">
                    <Award size={14} className="mr-1" />
                    Role
                  </p>
                  <p className="text-white font-semibold capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            {/* Team Registration Section */}
            {!team && (
              <div className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slideInRight hover:bg-indigo-900/70 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center group-hover:scale-105 transition-transform duration-300 relative z-10">
                  <div className="bg-gradient-to-r from-indigo-400 to-blue-400 p-3 rounded-2xl mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <Users size={20} className="text-white" />
                  </div>
                  Register Your Team
                </h2>
                
                <div className="space-y-6 relative z-10">
                  {/* Team Name */}
                  <div className="group">
                    <label className="block text-blue-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                      <Award className="mr-2 text-yellow-300" size={18} />
                      Team Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your team name"
                        value={teamData.teamName}
                        onChange={(e) => setTeamData({...teamData, teamName: e.target.value})}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-indigo-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Institute */}
                  <div className="group">
                    <label className="block text-blue-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                      <Building className="mr-2 text-green-300" size={18} />
                      Institute *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
                        placeholder="Enter your institute name"
                        value={teamData.institute}
                        onChange={(e) => setTeamData({...teamData, institute: e.target.value})}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-indigo-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Add Members */}
                  <div className="group">
                    <label className="block text-blue-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                      <Mail className="mr-2 text-pink-300" size={18} />
                      Add Team Members (max 3)
                    </label>
                    <div className="flex gap-3 mb-4">
                      <div className="relative flex-1">
                        <input
                          type="email"
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/15"
                          placeholder="Enter member email"
                          value={searchEmail}
                          onChange={(e) => setSearchEmail(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && searchMember()}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-indigo-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        {searchEmail && (
                          <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors" size={18} />
                        )}
                      </div>
                      <button 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 rounded-2xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={searchMember}
                        disabled={searchLoading}
                      >
                        {searchLoading ? (
                          <Loader className="animate-spin mr-2" size={18} />
                        ) : (
                          <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" size={18} />
                        )}
                        Add
                      </button>
                    </div>
                    
                    {members.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-medium text-blue-200 mb-4 flex items-center">
                          <Layers className="mr-2" size={18} />
                          Team Members ({members.length}/3):
                        </h3>
                        <div className="space-y-3">
                          {members.map((member) => (
                            <div key={member.userId} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 flex justify-between items-center group">
                              <div>
                                <p className="font-medium text-white">{member.name}</p>
                                <p className="text-sm text-blue-200">{member.email}</p>
                              </div>
                              <button 
                                className="bg-rose-500/10 text-rose-300 px-3 py-2 rounded-xl hover:bg-rose-500/20 transition-colors duration-200 flex items-center border border-rose-400/20 hover:border-rose-400/40"
                                onClick={() => removeMember(member.userId)}
                              >
                                <X size={16} className="mr-1" />
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Register Button */}
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-6 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 flex items-center justify-center group relative overflow-hidden mt-6"
                    onClick={registerTeam}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Users className="mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                    Register Team
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes shimmer-inner {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out both;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out both;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }
        
        .animate-shimmer-inner {
          animation: shimmer-inner 1.5s infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RegisterTeam;