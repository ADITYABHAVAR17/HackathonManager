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

  if (loading) return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-1/3 bg-gradient-to-r from-slate-200 to-slate-100 rounded-xl"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl border border-slate-200/80"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto p-4">
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out">
        {/* Animated background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-emerald-400/5 to-cyan-500/5 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        
        <div className="relative z-10 p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2 leading-tight">
              Problem Dashboard
            </h2>
            <p className="text-slate-500 font-medium">Manage and review coding challenges</p>
          </div>

          {error && (
            <div className="bg-gradient-to-r from-red-50/80 to-rose-50/80 border-l-4 border-red-400 text-red-900 px-6 py-4 rounded-lg mb-6 shadow-sm backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {problems?.length === 0 ? (
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-l-4 border-blue-400 text-blue-900 px-6 py-6 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">No problems found</h3>
                  <p className="text-sm text-blue-700/80">Create your first problem to get started</p>
                </div>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {problems.map((problem) => (
                <li
                  key={problem._id}
                  className="relative p-6 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-xl hover:shadow-md transition-all duration-300 ease-out hover:border-slate-300 group overflow-hidden"
                >
                  {/* Problem card background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -right-10 -top-10 w-28 h-28 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 flex items-start space-x-2">
                          <Link to={`/admin/problems/${problem._id}`} className="hover:underline underline-offset-4 decoration-2 decoration-blue-400/50">
                            {problem.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-slate-600 line-clamp-2">{problem.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <span className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg border border-blue-200/80 shadow-sm">
                            {problem.domain}
                          </span>
                          <span
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border shadow-sm ${
                              problem.difficulty === "Easy"
                                ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200/80"
                                : problem.difficulty === "Medium"
                                ? "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200/80"
                                : "bg-gradient-to-r from-red-50 to-rose-100 text-red-800 border-red-200/80"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {problem.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 rounded-lg border border-slate-200/80 shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 md:pl-4">
                        <Link 
                          to={`/admin/problems/${problem._id}`}
                          className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(problem._id)}
                          disabled={deletingId === problem._id}
                          className={`relative overflow-hidden px-4 py-2 text-sm font-medium rounded-lg 
                                     transition-all duration-300 ease-out transform
                                     ${
                                       deletingId === problem._id
                                         ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                         : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-md hover:scale-[1.02] active:scale-95'
                                     }
                                     focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 transition-opacity duration-300 ${deletingId !== problem._id ? 'group-hover:opacity-20' : ''}`}></div>
                          <div className="relative z-10 flex items-center justify-center space-x-2">
                            {deletingId === problem._id ? (
                              <>
                                <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                                <span>Deleting</span>
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>Delete</span>
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex justify-between items-center">
                      <span className="text-xs text-slate-500">
                        Created: {new Date(problem.createdAt).toLocaleDateString()}
                      </span>
                      <Link 
                        to={`/admin/problems/${problem._id}`} 
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <span>View details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemList;