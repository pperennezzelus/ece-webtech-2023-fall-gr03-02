import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useUser } from "../components/UserContext";

const CreateArticlePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [game, setGame] = useState("");
  const [region, setRegion] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const handleImageUrlsChange = (e) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setImageUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("articles")
      .insert([
        {
          user_id: user.id,
          title,
          content,
          image_urls: imageUrls,
          game,
          region,
        },
      ]);

    if (error) {
      console.error("Error creating article:", error);
      alert("Error creating article: " + error.message);
    } else {
      alert("Article created successfully!");
      router.push("/articles");
    }
  };

  return (
    <div className="flex min-h-screen bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950">
      <div className="container mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Content Field */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="6"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          {/* Image URLs Field */}
          <div>
            <label
              htmlFor="imageUrls"
              className="block text-sm font-medium text-gray-700"
            >
              Image URLs (comma separated)
            </label>
            <input
              type="text"
              id="imageUrls"
              name="imageUrls"
              value={imageUrls.join(", ")}
              onChange={handleImageUrlsChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Game Dropdown */}
          <div>
            <label
              htmlFor="game"
              className="block text-sm font-medium text-gray-700"
            >
              Game
            </label>
            <select
              id="game"
              name="game"
              required
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a Game</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Valorant">Valorant</option>
              <option value="Rocket League">Rocket League</option>
            </select>
          </div>
          {/* Region Dropdown */}
          <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700"
            >
              Region
            </label>
            <select
              id="region"
              name="region"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a Region</option>
              <option value="China">China</option>
              <option value="Europe">Europe</option>
              <option value="Korea">Korea</option>
              <option value="North America">North America</option>
            </select>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticlePage;
