// pages/contact.js
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Contact() {
  const supabase = useSupabaseClient();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState(null);

  const onSubmit = async function (e) {
    e.preventDefault();
    // Insert contact record into the contacts database
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          message: formData.message,
        },
      ]);
    // Print a friendly confirmation message
    setMessage('Thank you for contacting us!');
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-md shadow-md max-w-md">
      <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80" onClick={() => setMessage(null)}>
          <div className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white rounded-md">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
