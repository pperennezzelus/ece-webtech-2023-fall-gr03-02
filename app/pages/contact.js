// pages/contact.js
import { useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DarkModeContext } from '../components/DarkmodeContext'; 

export default function Contact() {
  const supabase = useSupabaseClient();
  const { isDarkMode } = useContext(DarkModeContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState(null); // State for success message
  const [error, setError] = useState(null); // State for error message

  const onSubmit = async function (e) {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Insert contact record into the contacts database
    const { data, error } = await supabase.from("contacts").insert([
      {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      setError(error.message); // Update error state
      return;
    }

    console.log("Inserted data:", data); // Log inserted data

    // Reset form data to initial state
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    });

    // Print a friendly confirmation message
    setMessage("Thank you for contacting us!");
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-white'}`}>
    <div className={`container mx-auto p-4 mb-64 rounded-md shadow-md max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
     <h1 className={`text-3xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Contact Us</h1>
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* First Name Field */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
              required
            />
          </div>
                    {/* Last Name Field */}
                    <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
              required
            />
          </div>
                    {/* Message Field */}
                    <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows="4"
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${isDarkMode ? 'hover:bg-blue-700' : ''}`}
            >
              Submit
            </button>
          </div>
        </form>
                {/* Success/Error Message */}
                {message && (
          <div className="mt-4 bg-green-100 text-green-700 p-2 rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-2 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}