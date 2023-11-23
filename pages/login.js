import React, { useState } from "react";
import { useUser } from "../components/UserContext";
import { supabase } from "../utils/supabaseClient"; // Import supabase client

const LoginPage = () => {
  const { user, login, logout } = useUser(); // Add logout if needed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        // Handle registration
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert(
          "Registration successful. Please check your email for verification."
        );
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      {user ? (
        <div className="user-info-container mt-8 text-center">
          <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
          <button
            onClick={logout}
            className="mt-4 p-2 border-2 border-gray-300 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold mb-4">
            {isLogin ? "Login" : "Register"}
          </h1>
          <form
            onSubmit={handleAuth}
            className="flex flex-col gap-4 items-center"
          >
            <label className="flex flex-col w-full max-w-xs">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <label className="flex flex-col w-full max-w-xs">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border-2 border-gray-300 rounded w-full"
              />
            </label>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full max-w-xs"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-blue-600 hover:text-blue-800 transition duration-300"
            >
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
