import React, { useState } from "react";
import { useUser } from "../components/UserContext";
import users from "../data/users.json";

const LoginPage = () => {
  const { user, login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticateUser = (email, password) => {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    const authenticatedUser = authenticateUser(email, password);
    if (authenticatedUser) {
      login({ ...authenticatedUser });
    } else {
      alert("Wrong Email or Password");
    }
  };

  return (
    <div className="container mx-auto p-8">
      {user ? (
        <div className="user-info-container mt-8 text-center">
          <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
          <img
            src={user.picture}
            alt={user.name}
            className="block mx-auto border-2 border-gray-300 rounded-full h-32 w-32 mt-4"
          />
          <p className="mt-4">Email: {user.email}</p>
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
          <form
            onSubmit={onClickLogin}
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
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
