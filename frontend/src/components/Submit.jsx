import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  User, 
  Users, 
  Building, 
  FileText, 
  Github, 
  Presentation, 
  Video, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  Calendar,
  ExternalLink,
  Lightbulb,
  Sparkles,
  Award,
  Code,
  Layers
} from "lucide-react";

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
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(userResponse.data.user);

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
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [problemId, team]);

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

  const submitSolution = async () => {
    if (!submission.ideaSummary || !submission.githubLink) {
      toast.error("Idea summary and GitHub link are required");
      return;
    }

    setSubmitLoading(true);
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
    } finally {
      setSubmitLoading(false);
    }
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
            <p className="text-white text-xl font-medium animate-pulse">Loading submission portal...</p>
            <p className="text-purple-200 mt-2">Preparing your creative space</p>
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

  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Team Required Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5"></div>
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Team-themed elements */}
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-amber-400/20 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-orange-400/30 rotate-45 animate-spin-slow delay-700"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-amber-300/20 animate-fadeIn max-w-md relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 rounded-2xl inline-block mb-6">
              <Users size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">
              Team Required
            </h2>
            <p className="text-amber-100 mb-8">You need to register a team before submitting solutions.</p>
            <button
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-amber-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto group"
              onClick={() => navigate(`/problem/${problemId}`)}
            >
              <Users className="mr-2 group-hover:scale-110 transition-transform" size={20} />
              Go to Team Registration
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
        <div className="max-w-6xl mx-auto">
          {/* Animated Title */}
          <div className="text-center mb-12 animate-fadeInUp relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl"></div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 relative z-10">
              Submit Your Solution
            </h1>
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User & Team Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Info Card */}
              <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 animate-slideInLeft hover:bg-purple-900/70 transition-all duration-500 group relative overflow-hidden">
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Email
                    </p>
                    <p className="text-white font-semibold text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Team Info Card */}
              <div className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 animate-slideInLeft hover:bg-indigo-900/70 transition-all duration-500 group relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center group-hover:scale-105 transition-transform duration-300 relative z-10">
                  <div className="bg-gradient-to-r from-indigo-400 to-blue-400 p-3 rounded-2xl mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <Users size={20} className="text-white" />
                  </div>
                  Team Details
                </h2>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-indigo-300/30">
                    <p className="text-indigo-200 text-sm mb-1 flex items-center">
                      <Award size={14} className="mr-1" />
                      Team Name
                    </p>
                    <p className="text-white font-semibold">{team?.teamName}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-indigo-300/30">
                    <p className="text-indigo-200 text-sm mb-1 flex items-center">
                      <Building size={14} className="mr-1" />
                      Institute
                    </p>
                    <p className="text-white font-semibold">{team?.institute}</p>
                  </div>
                </div>
              </div>

              {/* Submission Status Card */}
              <div className="bg-gradient-to-br from-pink-900/60 to-rose-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 animate-slideInLeft hover:bg-pink-900/70 transition-all duration-500 group relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-500/10 rounded-full blur-xl"></div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center group-hover:scale-105 transition-transform duration-300 relative z-10">
                  <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-3 rounded-2xl mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <FileText size={20} className="text-white" />
                  </div>
                  Submission Status
                </h2>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-pink-300/30">
                    <p className="text-pink-200 text-sm mb-1 flex items-center">
                      <Code size={14} className="mr-1" />
                      Problem ID
                    </p>
                    <p className="text-white font-semibold">{problemId}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:border-pink-300/30">
                    <p className="text-pink-200 text-sm mb-1 flex items-center">
                      <Layers size={14} className="mr-1" />
                      Status
                    </p>
                    <div className="flex items-center">
                      {submission.isSubmitted ? (
                        <>
                          <CheckCircle className="text-green-400 mr-2" size={18} />
                          <span className="text-white font-semibold">Submitted</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-yellow-400 mr-2" size={18} />
                          <span className="text-white font-semibold">Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Submission Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slideInRight hover:bg-blue-900/70 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                      <Send size={24} className="text-white" />
                    </div>
                    Submit Your Solution
                  </h2>

                  <div className="space-y-8">
                    {/* Idea Summary */}
                    <div className="group">
                      <label className="block text-cyan-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                        <Lightbulb className="mr-2 text-yellow-300" size={18} />
                        Idea Summary *
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-cyan-200 focus:bg-white/20 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/15 resize-none"
                          rows="6"
                          placeholder="Describe your innovative solution and its key features..."
                          value={submission.ideaSummary}
                          onChange={(e) =>
                            setSubmission({ ...submission, ideaSummary: e.target.value })
                          }
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/5 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* GitHub Link */}
                    <div className="group">
                      <label className="block text-cyan-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                        <Github className="mr-2 text-purple-200" size={18} />
                        GitHub Repository Link *
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-cyan-200 focus:bg-white/20 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/15"
                          placeholder="https://github.com/yourteam/awesome-project"
                          value={submission.githubLink}
                          onChange={(e) =>
                            setSubmission({ ...submission, githubLink: e.target.value })
                          }
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/5 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        {submission.githubLink && (
                          <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-white transition-colors" size={18} />
                        )}
                      </div>
                    </div>

                    {/* Optional Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* PPT Link */}
                      <div className="group">
                        <label className="block text-cyan-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                          <Presentation className="mr-2 text-pink-300" size={18} />
                          PPT Link (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-cyan-200 focus:bg-white/20 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/15"
                            placeholder="https://slides.com/presentation"
                            value={submission.pptLink}
                            onChange={(e) =>
                              setSubmission({ ...submission, pptLink: e.target.value })
                            }
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/5 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          {submission.pptLink && (
                            <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-white transition-colors" size={18} />
                          )}
                        </div>
                      </div>

                      {/* Video Link */}
                      <div className="group">
                        <label className="block text-cyan-200 font-medium mb-3 flex items-center group-hover:text-white transition-colors duration-200">
                          <Video className="mr-2 text-red-300" size={18} />
                          Video Demo Link (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-cyan-200 focus:bg-white/20 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 hover:bg-white/15"
                            placeholder="https://youtube.com/watch?v=demo"
                            value={submission.videoLink}
                            onChange={(e) =>
                              setSubmission({ ...submission, videoLink: e.target.value })
                            }
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-400/5 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          {submission.videoLink && (
                            <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-white transition-colors" size={18} />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center space-y-4 pt-6">
                      <button
                        className={`${
                          submission.isSubmitted
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 cursor-default"
                            : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-2 hover:scale-105"
                        } text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:scale-100 group relative overflow-hidden`}
                        onClick={submitSolution}
                        disabled={submission.isSubmitted || submitLoading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {submission.isSubmitted ? (
                          <>
                            <CheckCircle className="mr-3" size={24} />
                            Solution Submitted
                          </>
                        ) : submitLoading ? (
                          <>
                            <Loader className="animate-spin mr-3" size={24} />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
                            Submit Solution
                          </>
                        )}
                      </button>

                      {submission.isSubmitted && (
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-4 animate-fadeIn w-full text-center">
                          <p className="text-green-200 flex items-center justify-center">
                            <Calendar className="mr-2" size={18} />
                            Submitted on: {new Date(submission.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default SubmitSolution;