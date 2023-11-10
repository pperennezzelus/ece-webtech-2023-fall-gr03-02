import React, { useState } from "react";

const LoginControlled = () => {
  // State to store the form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Function to handle the change in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-2xl font-bold mb-4">Login Controlled</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <label className="flex flex-col w-full max-w-xs">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border-2 border-gray-300 rounded w-full"
          />
        </label>
        <label className="flex flex-col w-full max-w-xs">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border-2 border-gray-300 rounded w-full"
          />
        </label>
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full max-w-xs"
        >
          Submit
        </button>
      </form>
      {formData.username && <p>Username: {formData.username}</p>}
      {formData.password && <p>Password: {formData.password}</p>}
    </div>
  );
};

export default LoginControlled;
