import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Lock, CheckCircle2, AlertCircle, Loader2, Shield } from 'lucide-react';

function ResetPass() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSuccess(false);
      return;
    }
    
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      const response = await axios.put(`/api/auth/resetpassword/${id}`, {
        password,
      });
      setMessage(response.data.message || "Password reset successful");
      setIsSuccess(true);
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(err.response?.data?.message || "Failed to reset password");
      setIsSuccess(false);
    } finally {
      setLoading(false);
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

            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Reset Password
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm">
                Create a new secure password
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <form onSubmit={resetPassword}>
              {/* Message Display */}
              {(message || error) && (
                <div className={`mb-4 border-l-4 rounded-r-lg p-3 ${
                  isSuccess 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {isSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="ml-2">
                      <p className={`text-xs sm:text-sm font-medium ${
                        isSuccess ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {message || error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="group mb-4">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 transition-colors group-focus-within:text-indigo-600">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500 text-sm"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="group mb-6">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 transition-colors group-focus-within:text-indigo-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-900 placeholder-gray-500 text-sm"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mb-6 space-y-2">
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
                      : "Weak"}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-3 px-4 rounded-lg font-medium text-sm shadow-md transform transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-lg"
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  <span>Reset Password</span>
                )}
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            </form>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center text-gray-500 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Your information is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;