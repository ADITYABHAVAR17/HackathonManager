import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({ name, email, password, role: "team" }); // Default role is 'user'
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute top-4 left-4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Join Us Today</h2>
              <p className="text-indigo-100 text-sm">Create your new account</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 animate-slideInDown">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Create a secure password"
                  />
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="flex space-x-1">
                  <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    password.length >= 1 ? 'bg-red-400' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    password.length >= 6 ? 'bg-yellow-400' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    password.length >= 8 && /[A-Z]/.test(password) ? 'bg-indigo-400' : 'bg-gray-200'
                  }`}></div>
                </div>
                <p className="text-xs text-gray-500">
                  Password strength: {
                    password.length >= 8 && /[A-Z]/.test(password) ? 'Strong' :
                    password.length >= 6 ? 'Medium' :
                    password.length >= 1 ? 'Weak' : 'Enter password'
                  }
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`group relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-xl transform transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    :                     'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-1 hover:shadow-2xl'
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </span>
                )}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            </div>    


            {/* login with google */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Or register with</p>
              <button
                onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
                className="mt-3 w-full py-3 px-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 8.59L11.17 15H9v-1.17l5.41-5.41c.39-.39.39-1.02 0-1.41l-.59-.59c-.39-.39-1.02-.39-1.41 0L7.83 11H9v2H7V9h2V7H5v8h8v-2H9v-2h2l4.59-4.59c.39-.39.39-1.02 0-1.41l-.59-.59c-.39-.39-1.02-.39-1.41 0z" />
                </svg>
                <span className="text-gray-700 font-semibold">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default Register;