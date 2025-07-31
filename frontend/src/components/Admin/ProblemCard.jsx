import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProblemCard() {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, [id]);

  return (
    <div className="mx-auto bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out backdrop-blur-sm">
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded w-16"></div>
                <div className="h-6 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg text-sm shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">Error loading problem: {error.message}</span>
              </div>
            </div>
          ) : problem ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight">
                {problem.title}
              </h2>
              
              <div className="prose prose-sm max-w-none text-slate-700">
                <p>{problem.description}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-sm bg-blue-50 text-blue-800 rounded-full border border-blue-100">
                  Domain: {problem.domain}
                </span>
                
                <span className={`px-3 py-1 text-sm rounded-full border ${
                  problem.difficulty === "Easy"
                    ? "bg-green-50 text-green-800 border-green-100"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-50 text-yellow-800 border-yellow-100"
                    : "bg-red-50 text-red-800 border-red-100"
                }`}>
                  Difficulty: {problem.difficulty}
                </span>
              </div>
              
              {problem.tags && problem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {problem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 text-xs bg-slate-50 text-slate-600 rounded-full border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-lg text-sm">
              No problem data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;