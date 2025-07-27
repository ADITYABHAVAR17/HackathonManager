import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


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


  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDomainColor = (domain) => {
    const colors = [
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-cyan-100 text-cyan-800 border-cyan-200'
    ];
    const hash = domain?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Problem Collection
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Discover and solve challenging problems</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 animate-pulse">Loading amazing problems...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-red-800">Oops! Something went wrong</h3>
                  <p className="text-red-700 mt-1">{error.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Problems Grid */}
        {!loading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <div
                key={problem._id}
                onClick={() => handleClick(problem)}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 hover:border-blue-200/50 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {problem.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {problem.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-6">
                  {/* Domain and Difficulty */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDomainColor(problem.domain)} transition-all duration-300 hover:scale-105`}>
                      {problem.domain}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(problem.difficulty)} transition-all duration-300 hover:scale-105`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags?.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                          #{tag}
                        </span>
                      ))}
                      {problem.tags?.length > 3 && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                          +{problem.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Arrow */}
                  <div className="flex justify-end">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <svg className="w-4 h-4 text-white transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && problems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No problems found</h3>
            <p className="text-gray-500">Check back later for new challenges!</p>
          </div>
        )}
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;