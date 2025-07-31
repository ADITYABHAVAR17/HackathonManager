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
    <div className="max-w-l mx-auto bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out backdrop-blur-sm">
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-8 leading-tight">
            Create New Problem
          </h2>

          {success && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-lg text-sm mb-6 shadow-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Problem created successfully!</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg text-sm mb-6 shadow-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          <div className="space-y-8" onSubmit={handleSubmit}>
            <div className="group relative">
              <label className="block text-sm font-semibold text-slate-700 mb-3 transition-all duration-200 group-focus-within:text-blue-600">
                Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 
                           transition-all duration-300 ease-out
                           focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none focus:bg-white
                           hover:border-slate-300 hover:shadow-md hover:bg-white/90
                           group-hover:shadow-lg"
                  placeholder="Enter problem title..."
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100"></div>
              </div>
            </div>

            <div className="group relative">
              <label className="block text-sm font-semibold text-slate-700 mb-3 transition-all duration-200 group-focus-within:text-blue-600">
                Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 
                           min-h-[140px] resize-y
                           transition-all duration-300 ease-out
                           focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none focus:bg-white
                           hover:border-slate-300 hover:shadow-md hover:bg-white/90
                           group-hover:shadow-lg"
                  placeholder="Describe the problem in detail..."
                />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="block text-sm font-semibold text-slate-700 mb-3 transition-all duration-200 group-focus-within:text-blue-600">
                  Domain
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 
                             transition-all duration-300 ease-out
                             focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none focus:bg-white
                             hover:border-slate-300 hover:shadow-md hover:bg-white/90
                             group-hover:shadow-lg"
                    placeholder="e.g., Computer Science"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100"></div>
                </div>
              </div>

              <div className="group relative">
                <label className="block text-sm font-semibold text-slate-700 mb-3 transition-all duration-200 group-focus-within:text-blue-600">
                  Difficulty
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-800 
                             transition-all duration-300 ease-out cursor-pointer appearance-none
                             focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none focus:bg-white
                             hover:border-slate-300 hover:shadow-md hover:bg-white/90
                             group-hover:shadow-lg"
                  >
                    <option value="Easy" className="text-green-600">🟢 Easy</option>
                    <option value="Medium" className="text-yellow-600">🟡 Medium</option>
                    <option value="Hard" className="text-red-600">🔴 Hard</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-400"></div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100"></div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <label className="block text-sm font-semibold text-slate-700 mb-3 transition-all duration-200 group-focus-within:text-blue-600">
                Tags
                <span className="text-slate-500 text-xs ml-2">(comma separated)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., algorithm, data structure, math, sorting"
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 
                           transition-all duration-300 ease-out
                           focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 focus:outline-none focus:bg-white
                           hover:border-slate-300 hover:shadow-md hover:bg-white/90
                           group-hover:shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <span className="text-xs">🏷️</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100"></div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full relative overflow-hidden px-8 py-4 text-base font-semibold rounded-xl shadow-lg 
                           transition-all duration-300 ease-out transform
                           ${submitting 
                             ? 'bg-slate-300 text-slate-500 cursor-not-allowed border-2 border-slate-300 scale-95' 
                             : 'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white border-2 border-transparent hover:shadow-2xl hover:scale-105 active:scale-95 hover:-translate-y-1'
                           }
                           focus:outline-none focus:ring-4 focus:ring-blue-200/50`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 ${!submitting ? 'hover:opacity-20' : ''}`}></div>
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Problem...</span>
                    </>
                  ) : (
                    <>
                      <span>✨ Create Problem</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;