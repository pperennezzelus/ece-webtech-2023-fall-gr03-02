import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { supabase } from "../utils/supabaseClient";
import { useUser } from "../components/UserContext";
import Footer from "../components/footer";
import { DarkModeContext } from "../components/DarkModeContext";
import "react-quill/dist/quill.snow.css";

// Dynamically import Quill only on the client-side
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

const CreateArticlePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [game, setGame] = useState("");
  const [region, setRegion] = useState("");
  const [imageURL, setImageURL] = useState(""); // State for image URL
  const router = useRouter();
  const { user } = useUser();
  const { isDarkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create an article.");
      return;
    }

    // Insert the article
    const { error } = await supabase.from("articles").insert([
      {
        user_id: user.id,
        title,
        content,
        game,
        region,
        image_urls: imageURL ? [imageURL] : [],
      },
    ]);

    if (error) {
      console.error("Error creating article:", error);
      alert("Error creating article: " + error.message);
      return;
    }

    alert("Article created successfully!");
    router.push("/articles");
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-b from-indigo-950 to-slate-950"
          : "bg-gradient-to-b from-white to-slate-400"
      }`}
    >
      <div
        className={`container mx-auto my-8 p-6 rounded-md shadow-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
        style={{ maxWidth: "900px" }}
      >
        <h1
          className={`text-3xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Create New Article
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Content
            </label>
            <QuillNoSSRWrapper
              theme="snow"
              modules={modules}
              formats={formats}
              value={content}
              onChange={setContent}
              style={{
                height: "400px",
                background: isDarkMode ? "gray" : "white",
                color: isDarkMode ? "white" : "black",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="game"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Game
            </label>
            <select
              id="game"
              name="game"
              required
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            >
              <option value="">Select a Game</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Valorant">Valorant</option>
              <option value="Rocket League">Rocket League</option>
              {/* Populate with your game options */}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="region"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Region
            </label>
            <select
              id="region"
              name="region"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            >
              <option value="">Select a Region</option>
              <option value="China">China</option>
              <option value="Europe">Europe</option>
              <option value="Korea">Korea</option>
              <option value="North America">North America</option>
              {/* Populate with your region options */}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="cover-image-url"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Cover Image URL
            </label>
            <input
              type="text"
              id="cover-image-url"
              name="cover-image-url"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Article
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateArticlePage;
