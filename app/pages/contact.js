// pages/contact.js
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Contact() {
  const supabase = useSupabaseClient();
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
    <div className="flex items-center justify-center min-h-screen bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950">
      <div className="container mx-auto p-4 mb-64 bg-black bg-opacity-40 rounded-md shadow-md max-w-md">
        <h1 className="text-3xl text-white font-semibold mb-6">Contact Us</h1>
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* First Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-500">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-500">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-bold text-gray-500">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows="4"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>

        {/* Success Message */}
        {message && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/80"
            onClick={() => setMessage(null)}
          >
            <div className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white rounded-md">
              {message}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500">An error occurred: {error}</div>
        )}
      </div>
    </div>
  );
}
