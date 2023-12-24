import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useUser } from "../components/UserContext";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filterGame, setFilterGame] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [orderDescending, setOrderDescending] = useState(true);
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      let query = supabase.from("articles").select("*");

      if (filterGame) {
        query = query.eq("game", filterGame);
      }

      if (filterRegion) {
        query = query.eq("region", filterRegion);
      }

      query = query.order("created_at", { ascending: !orderDescending });

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data);
      }
    };

    fetchArticles();
  }, [filterGame, filterRegion, orderDescending]);

  const handleOrderToggle = () => {
    setOrderDescending(!orderDescending);
  };

  return (
    <div className="flex min-h-screen bg-cover bg-gradient-to-b from-indigo-950 to-slate-950">
      <div className="container mx-auto my-8">
        {/* Filters and Create Article Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <select
              onChange={(e) => setFilterGame(e.target.value)}
              className="px-4 py-2 rounded-md"
            >
              <option value="">Filter by Game</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Valorant">Valorant</option>
              <option value="Rocket League">Rocket League</option>
            </select>
            <select
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-4 py-2 rounded-md"
            >
              <option value="">Filter by Region</option>
              <option value="China">China</option>
              <option value="Europe">Europe</option>
              <option value="Korea">Korea</option>
              <option value="North America">North America</option>
            </select>
            <button
              onClick={handleOrderToggle}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {orderDescending ? "Descending" : "Ascending"} Order
            </button>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => router.push("/create-article")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Article
            </button>
          )}
        </div>

        {/* Articles List */}
        <div className="mt-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="mb-4 p-4 border border-gray-800 rounded-md bg-black bg-opacity-40"
            >
              <a
                href={`/articles/${article.id}`}
                className="text-xl font-semibold hover:underline text-white"
              >
                {article.title}
              </a>
              <div className="mt-2">
                <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  {article.game}
                </span>
                <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  {article.region}
                </span>
              </div>
              <p className="text-gray-400">
                Published on {new Date(article.created_at).toLocaleDateString()}
              </p>
              <div className="mt-2 text-white">
                {article.content.length > 200
                  ? `${article.content.substring(0, 200)}...`
                  : article.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
