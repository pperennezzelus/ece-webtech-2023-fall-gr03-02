import { useState, useContext } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { DarkModeContext } from '../components/DarkModeContext'

export default function Contact() {
  const supabase = useSupabaseClient()
  const { isDarkMode } = useContext(DarkModeContext)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  })
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)


  const onSubmit = async function (e) {
    e.preventDefault()

    setError(null)

    const { data, error } = await supabase.from("contacts").insert([
      {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
      },
    ])

    if (error) {
      console.error("Error inserting data:", error)
      setError(error.message)
      return
    }

    console.log("Inserted data:", data)

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    })

    setMessage("Thank you for contacting us!")
  }

  return (
    <div className={`flex items-center justify-center min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-white to-slate-400'}`}>
      <div className={`container mx-auto p-4 mb-64 bg-opacity-40 rounded-md shadow-md max-w-md ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <h1 className={`text-3xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h1>
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* First Name Field */}
          <div>
            <label className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              className={`mt-1 p-2 w-full border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
              required
            />
          </div>
  
          {/* Last Name Field */}
          <div>
            <label className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className={`mt-1 p-2 w-full border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
              required
            />
          </div>
  
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`mt-1 p-2 w-full border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
              required
            />
          </div>
  
          {/* Message Field */}
          <div>
            <label className={`block text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows="4"
              className={`mt-1 p-2 w-full border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
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
          <div className={`text-red-500 ${isDarkMode ? 'text-white' : 'text-red-500'}`}>An error occurred: {error}</div>
        )}
      </div>
    </div>
  )
}
