import React, { useState } from 'react';

function LoginNative() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    setFormData({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-2xl font-bold mb-4">Login Native</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <label className="flex flex-col w-full max-w-xs">
          Username:
          <input
            type="text"
            name="username"
            className="p-2 border-2 border-gray-300 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300"
          />
        </label>
        <label className="flex flex-col w-full max-w-xs">
          Password:
          <input
            type="password"
            name="password"
            className="p-2 border-2 border-gray-300 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300"
          />
        </label>
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full max-w-xs transition duration-300"
        >
          Submit
        </button>
      </form>
      <div className="mt-4">
        {formData.username && <p>Username: {formData.username}</p>}
        {formData.password && <p>Password: {formData.password}</p>}
      </div>
    </div>
  );
}

export default LoginNative;
