import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Forgot() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setMessage("Please enter your email");
            return;
        }
        // Call the API to send reset link
        axios.post('/auth/forgotpassword', { email })
            .then(response => {
                setMessage("Password reset link sent to your email");
            })
            .catch(error => {
                console.error("Error sending reset link:", error);
                setMessage("Failed to send reset link. Please try again.");
            });
    }
       

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}   

export default Forgot