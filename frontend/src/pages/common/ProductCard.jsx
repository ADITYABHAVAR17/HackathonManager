import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  User,
  Users,
  FileText,
  Github,
  Presentation,
  Video,
  Calendar,
  ExternalLink,
  Lightbulb,
  Award,
  Code,
  Layers,
  AlertCircle,
  CheckCircle,
  Loader,
  Clock,
  Tag,
  Trophy,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Database,
  Cpu,
  BookOpen,
  Shield,
  Terminal,
} from "lucide-react";
import "./ProductCard.css";

function ProblemCard({ problemId }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [expandedTestCases, setExpandedTestCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/problems/${id}`);
        setProblem(response.data);
        console.log("Problem data fetched successfully:", response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRegister = async () => {
     if (!isProblemActive()) {
    toast.error("This problem is no longer accepting submissions");
    return;
  }
    try {
      const res = await axios.post(
        "/api/submissions/register",
        { problemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      navigate(`/problem/:${id}`);
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.message.includes("Team name already exists")
      ) {
        toast.warn(err.response.data.message);
        navigate(`/submit/${id}`);
      } else {
        toast.error("Something went wrong!");
        console.error(err);
      }
    }
    navigate(`/problem/${id}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-400/30";
      case "Hard":
        return "bg-rose-500/20 text-rose-300 border-rose-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  const getProblemTypeColor = (type) => {
    switch (type) {
      case "Coding":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "Idea Submission":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30";
      case "Prototype":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-400/30";
      case "Presentation":
        return "bg-pink-500/20 text-pink-300 border-pink-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  const toggleTestCase = (index) => {
    setExpandedTestCases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 animate-pulse">
                <FileText size={32} />
              </div>
            </div>
            <p className="text-white text-xl font-medium animate-pulse">
              Loading problem details...
            </p>
            <p className="text-purple-200 mt-2">
              Preparing the challenge for you
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-red-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-500/5 via-transparent to-red-500/5"></div>
          <div className="absolute top-16 left-16 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-16 right-16 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-rose-400/30 rotate-45 animate-bounce delay-300"></div>
          <div className="absolute bottom-1/3 left-1/4 w-10 h-10 border-2 border-red-400/20 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-rose-300/20 animate-fadeIn relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <AlertCircle
              className="text-rose-300 mx-auto mb-6 animate-bounce"
              size={64}
            />
            <div className="text-rose-100 text-xl font-medium">
              Failed to load problem details
            </div>
            <p className="text-rose-200 mt-2">{error.message}</p>
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

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-400/20 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-indigo-400/30 rotate-45 animate-spin-slow delay-700"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-blue-300/20 animate-fadeIn max-w-md relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-4 rounded-2xl inline-block mb-6">
              <FileText size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
              Problem Not Found
            </h2>
            <p className="text-blue-100 mb-8">
              The requested problem doesn't exist or is no longer available.
            </p>
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto group"
              onClick={() => (window.location.href = "/")}
            >
              <ChevronRight
                className="mr-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  const calculateTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return "0 days";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const isProblemActive = () => {
    return new Date(problem.endDate) > new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-indigo-800/20 to-blue-800/30"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-10 right-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-2500"></div>
        <div className="absolute top-32 right-32 w-16 h-16 border-2 border-purple-400/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-40 left-40 w-12 h-12 border-2 border-cyan-400/25 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-blue-400/25 rotate-45 animate-pulse delay-1200"></div>
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent transform rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent transform -rotate-12 delay-700"></div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            background:
              i % 4 === 0
                ? "rgba(147, 51, 234, 0.3)"
                : i % 4 === 1
                ? "rgba(56, 189, 248, 0.3)"
                : i % 4 === 2
                ? "rgba(236, 72, 153, 0.3)"
                : "rgba(34, 197, 94, 0.3)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            filter: "blur(0.5px)",
          }}
        ></div>
      ))}

      {/* Twinkling stars */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
          }}
        ></div>
      ))}

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 animate-fadeInUp relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl"></div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 relative z-10">
              {problem.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-300/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <Tag size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-blue-200 text-md mb-1.5">Type</p>
                  <p
                    className={`text-white font-semibold px-1.5 py-1 rounded-full text-sm ${getProblemTypeColor(
                      problem.problemType
                    )}`}
                  >
                    {problem.problemType}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-300/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-purple-200 text-md mb-1.5">Difficulty</p>
                  <p
                    className={`text-white font-semibold px-1 py-1 rounded-full text-sm ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-indigo-300/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-indigo-400 to-blue-400 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-indigo-200 text-sm">Submissions</p>
                  <p className="text-white font-semibold mt-1.5">
                    {problem.totalSubmissions || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/60 to-emerald-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-300/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-cyan-200 text-sm">Status</p>
                  <p className="text-white font-semibold flex items-center mt-1.5">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        new Date(problem.endDate) > new Date()
                          ? "bg-green-400 animate-pulse"
                          : "bg-red-400"
                      }`}
                    ></span>
                    {new Date(problem.endDate) > new Date()
                      ? "Active"
                      : "Closed"}
                  </p>
                </div>
              </div>
            </div>

            {isProblemActive() ? (
              <div
                className="bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-indigo-300/50 transition-all duration-300 group cursor-pointer"
                onClick={handleRegister}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-indigo-400 to-blue-400 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <UserPlus size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-md">Register</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-900/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-all duration-300 cursor-not-allowed">
                <div className="flex items-center space-x-4 opacity-70">
                  <div className="bg-gradient-to-r from-gray-400 to-slate-400 p-3 rounded-xl">
                    <UserPlus size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-200 text-md">Registration Closed</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Domain and Author Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-violet-900/60 to-purple-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-violet-300/50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-violet-400 to-purple-400 p-3 rounded-xl">
                  <Database size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-violet-200 text-sm">Domain</p>
                  <p className="text-white font-semibold mt-1.5">
                    {problem.domain}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/60 to-cyan-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-300/50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-3 rounded-xl">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Author</p>
                  <p className="text-white font-semibold mt-1.5">
                    {problem.author || "Hackathon Organizers"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Navigation Tabs */}
            <div className="border-b border-white/10 ">
              <nav className="flex space-x-1 overflow-x-auto px-6 ">
                {[
                  {
                    id: "overview",
                    label: "Overview",
                    icon: <FileText size={18} />,
                  },
                  { id: "details", label: "Details", icon: <Code size={18} /> },
                  {
                    id: "testcases",
                    label: "Test Cases",
                    icon: <Terminal size={18} />,
                  },
                  {
                    id: "evaluation",
                    label: "Evaluation",
                    icon: <Award size={18} />,
                  },
                  {
                    id: "schedule",
                    label: "Schedule",
                    icon: <Calendar size={18} />,
                  },
                  {
                    id: "rewards",
                    label: "Rewards",
                    icon: <Trophy size={18} />,
                  },
                  { id: "faqs", label: "FAQs", icon: <HelpCircle size={18} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "border-cyan-400 text-white bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                        : "border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="opacity-80">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Sections */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Description */}
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <span>Description</span>
                    </h3>
                    <div className="text-slate-300 whitespace-pre-wrap">
                      {problem.description}
                    </div>
                  </div>

                  {/* Sample Input/Output */}
                  {(problem.sampleInput || problem.sampleOutput) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {problem.sampleInput && (
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-blue-400/20">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                              <Code size={20} className="text-white" />
                            </div>
                            <span>Sample Input</span>
                          </h3>
                          <pre className="text-slate-200 bg-slate-900/50 p-4 rounded-lg border border-blue-500/20 overflow-x-auto">
                            {problem.sampleInput}
                          </pre>
                        </div>
                      )}
                      {problem.sampleOutput && (
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-green-400/20">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                              <FileText size={20} className="text-white" />
                            </div>
                            <span>Sample Output</span>
                          </h3>
                          <pre className="text-slate-200 bg-slate-900/50 p-4 rounded-lg border border-green-500/20 overflow-x-auto">
                            {problem.sampleOutput}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-8">
                  {/* Input/Output Format */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {problem.inputFormat && (
                      <div className="bg-slate-800/50 rounded-2xl p-6 border border-blue-400/20">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                            <Code size={20} className="text-white" />
                          </div>
                          <span>Input Format</span>
                        </h3>
                        <div className="text-slate-200 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-lg border border-blue-500/20">
                          {problem.inputFormat}
                        </div>
                      </div>
                    )}

                    {problem.outputFormat && (
                      <div className="bg-slate-800/50 rounded-2xl p-6 border border-green-400/20">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                            <FileText size={20} className="text-white" />
                          </div>
                          <span>Output Format</span>
                        </h3>
                        <div className="text-slate-200 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-lg border border-green-500/20">
                          {problem.outputFormat}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Constraints */}
                  {problem.constraints && (
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-amber-400/20">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
                          <AlertCircle size={20} className="text-white" />
                        </div>
                        <span>Constraints</span>
                      </h3>
                      <div className="text-slate-200 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-lg border border-amber-500/20">
                        {problem.constraints}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "testcases" && (
                <div className="space-y-6">
                  {problem.testCases && problem.testCases.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
                          <Terminal size={20} className="text-white" />
                        </div>
                        <span>Test Cases</span>
                      </h3>
                      <div className="space-y-4">
                        {problem.testCases.map((testCase, index) => (
                          <div
                            key={index}
                            className="bg-slate-800/50 rounded-xl border border-slate-600 overflow-hidden"
                          >
                            <button
                              className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors"
                              onClick={() => toggleTestCase(index)}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-indigo-500/30 to-blue-500/30 text-indigo-200 rounded-full border border-indigo-400/30">
                                  Test Case {index + 1}
                                </span>
                                <span className="text-white font-medium">
                                  {testCase.isPublic ? "Public" : "Private"}
                                </span>
                              </div>
                              {expandedTestCases.includes(index) ? (
                                <ChevronDown
                                  size={20}
                                  className="text-slate-400"
                                />
                              ) : (
                                <ChevronRight
                                  size={20}
                                  className="text-slate-400"
                                />
                              )}
                            </button>
                            {expandedTestCases.includes(index) && (
                              <div className="p-4 border-t border-slate-600/50 bg-slate-900/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-300 mb-2">
                                      Input
                                    </h4>
                                    <pre className="text-slate-200 bg-slate-900/50 p-3 rounded-lg border border-blue-500/20 overflow-x-auto text-sm">
                                      {testCase.input}
                                    </pre>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-300 mb-2">
                                      Expected Output
                                    </h4>
                                    <pre className="text-slate-200 bg-slate-900/50 p-3 rounded-lg border border-green-500/20 overflow-x-auto text-sm">
                                      {testCase.output}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-slate-700/50 text-slate-400 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Terminal size={32} />
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        No Test Cases Available
                      </h4>
                      <p className="text-slate-400 max-w-md mx-auto">
                        Test cases will be provided upon submission.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "evaluation" && (
                <div className="space-y-8">
                  {/* Evaluation Criteria */}
                  {problem.evaluationCriteria && (
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-400/20">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                          <Award size={20} className="text-white" />
                        </div>
                        <span>Evaluation Criteria</span>
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {Object.entries(problem.evaluationCriteria).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="bg-slate-900/70 p-4 rounded-xl border border-purple-500/20 shadow-sm text-center hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                            >
                              <div className="text-3xl font-bold text-purple-400 mb-2">
                                {value}%
                              </div>
                              <div className="text-sm text-slate-300 font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Accepted Submissions */}
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-emerald-400/20">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-2 rounded-lg">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                      <span>Accepted Submissions</span>
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="text-5xl font-bold text-emerald-400">
                        {problem.acceptedSubmissions || 0}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg">
                          <Calendar size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Start Date
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-blue-300" />
                        <div className="text-slate-200 text-lg font-medium">
                          {formatDate(problem.startDate)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-rose-400/20 hover:border-rose-400/40 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 rounded-lg">
                          <Calendar size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          End Date
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-rose-300" />
                        <div className="text-slate-200 text-lg font-medium">
                          {formatDate(problem.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-400/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-lg">
                        <Clock size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Time Remaining
                      </h3>
                    </div>
                    <div className="text-slate-200">
                      {new Date(problem.endDate) > new Date() ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                          <span>
                            Event is active -{" "}
                            {calculateTimeRemaining(problem.endDate)} remaining
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          <span>
                            Event ended on {formatDate(problem.endDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "rewards" && (
                <div className="space-y-6">
                  {problem.rewards && problem.rewards.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-2 rounded-lg">
                          <Trophy size={20} className="text-white" />
                        </div>
                        <span>Rewards</span>
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {problem.rewards.map((reward, index) => (
                          <div
                            key={index}
                            className={`bg-gradient-to-br rounded-xl p-6 border shadow-sm hover:shadow-md transition-all ${
                              reward.prizeAmount > 0
                                ? "from-amber-900/40 to-yellow-900/40 border-amber-400/20 hover:border-amber-400/40"
                                : "from-slate-800/50 to-slate-700/50 border-slate-600 hover:border-slate-400"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-white text-xl mb-2">
                                  {reward.title}
                                </h4>
                                <p className="text-slate-300">
                                  {reward.description}
                                </p>
                              </div>
                              {reward.prizeAmount > 0 && (
                                <div className="bg-gradient-to-r from-amber-600/30 to-yellow-600/30 px-4 py-2 rounded-lg border border-amber-400/30 shadow-sm">
                                  <span className="text-2xl font-bold text-amber-300">
                                    ${reward.prizeAmount.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-6">
                              <span
                                className={`px-3 py-1 text-xs rounded-full font-medium ${
                                  reward.isPublic
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                                    : "bg-slate-700/50 text-slate-300 border border-slate-600"
                                }`}
                              >
                                {reward.isPublic
                                  ? "Public Prize"
                                  : "Private Prize"}
                              </span>
                              <div className="text-amber-300 text-3xl">
                                {reward.prizeAmount > 0 ? "💰" : "🏅"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-slate-700/50 text-slate-400 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Trophy size={32} />
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        No Rewards Announced
                      </h4>
                      <p className="text-slate-400 max-w-md mx-auto">
                        Stay tuned for information about potential rewards.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "faqs" && (
                <div className="space-y-6">
                  {problem.faqs && problem.faqs.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                          <HelpCircle size={20} className="text-white" />
                        </div>
                        <span>Frequently Asked Questions</span>
                      </h3>
                      <div className="space-y-4">
                        {problem.faqs.map((faq, index) => (
                          <div
                            key={index}
                            className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-slate-400 transition-all shadow-sm hover:shadow-lg hover:shadow-blue-500/10"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 p-3 rounded-lg flex-shrink-0 text-blue-200">
                                <span className="font-bold">Q</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-white mb-3">
                                  {faq.question}
                                </h4>
                                <div className="flex items-start gap-4">
                                  <div className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 p-3 rounded-lg flex-shrink-0 text-emerald-200">
                                    <span className="font-bold">A</span>
                                  </div>
                                  <div className="text-slate-300">
                                    {faq.answer}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-slate-700/50 text-slate-400 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <HelpCircle size={32} />
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        No FAQs Yet
                      </h4>
                      <p className="text-slate-400 max-w-md mx-auto">
                        Have a question? Contact the organizers for more
                        information.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;
