import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const from = location.state?.from || "/user";
  const data = location.state?.data || null;

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-indigo-100 text-sm">Sign in to your account</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 animate-slideInDown">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
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
                    <svg
                      className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className={`group relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-xl transform transition-all duration-300 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-1 hover:shadow-2xl"
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 group-hover:animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </span>
                )}
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            </div>
            {/* //forgot password  */}
            <div className="mt-4 text-center">
              <a
                href="/auth/forgot-password"
                className="text-indigo-600 hover:text-purple-600 font-semibold transition-colors duration-300"
              >
                Forgot Password?
              </a>
            
          </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/auth/register")}
                  className="text-indigo-600 hover:text-purple-600 font-semibold cursor-pointer relative group transition-colors duration-300"
                >
                  Create Account
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </p>
            </div>

            {/* Divider with Social Login Hint */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Secure Login
                </span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your information is secure and encrypted
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
