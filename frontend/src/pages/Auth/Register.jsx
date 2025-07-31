import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  User as UserIcon,
  Mail,
  Lock,
  AlertCircle,
  Shield,
  Github,
  Loader2,
  LogIn
} from "lucide-react";

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
      await register({ name, email, password, role: "team" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto my-6">
        {/* Main Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-5 rounded-full"></div>
            <div className="absolute top-4 left-4 w-12 h-12 bg-white opacity-5 rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Create your new account
              </h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-3 animate-pulse">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="ml-2">
                      <p className="text-red-800 font-medium text-xs sm:text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 transition-colors group-focus-within:text-indigo-600">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 transition-colors group-focus-within:text-indigo-600">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 transition-colors group-focus-within:text-indigo-600">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="Create a secure password"
                    />
                  </div>
                </div>

                {/* Password Strength Indicator */}
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    <div
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        password.length >= 1 ? "bg-red-400" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        password.length >= 6 ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        password.length >= 8 && /[A-Z]/.test(password)
                          ? "bg-indigo-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Password strength:{" "}
                    {password.length >= 8 && /[A-Z]/.test(password)
                      ? "Strong"
                      : password.length >= 6
                      ? "Medium"
                      : password.length >= 1
                      ? "Weak"
                      : "Enter password"}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full py-3 px-4 rounded-lg font-medium text-sm shadow-md transform transition-all duration-300 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-lg"
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center">
                      <LogIn className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                      <span>Create Account</span>
                    </span>
                  )}
                  {!isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </div>
            </form>

            {/* OAuth Section */}
            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500 font-medium">
                    Continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {/* Google Sign In */}
                <button
                  onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
                  className="group w-full flex items-center justify-center gap-2 p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium transition-colors group-hover:text-gray-900 text-xs sm:text-sm">
                    Sign in with Google
                  </span>
                </button>

                {/* GitHub Sign In */}
                <button
                  onClick={() => window.location.href = "http://localhost:5000/api/auth/github"}
                  className="group w-full flex items-center justify-center gap-2 p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Github className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-700 font-medium transition-colors group-hover:text-gray-900 text-xs sm:text-sm">
                    Sign in with GitHub
                  </span>
                </button>

                {/* Spotify Sign In */}
                <button
                  onClick={() => window.location.href = "https://eb462ba5c1f9.ngrok-free.app/api/auth/spotify"}
                  className="group w-full flex items-center justify-center gap-2 p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1DB954">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span className="text-gray-700 font-medium transition-colors group-hover:text-gray-900 text-xs sm:text-sm">
                    Sign in with Spotify
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;