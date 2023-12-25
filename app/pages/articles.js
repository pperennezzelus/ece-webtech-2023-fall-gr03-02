import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useUser } from "../components/UserContext";
import { DarkModeContext } from '../components/DarkmodeContext'; 

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const { user, isLoggedIn } = useUser();
  const router = useRouter();
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchArticles = async () => {
      let { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={`flex min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-white'}`}> 
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Articles</h1>
        {isLoggedIn && (
          <button
            onClick={() => router.push("/create-article")}
            className={`bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Create Article
          </button>
        )}
      </div>

      <div className="mt-6 ">
        {articles.map((article) => (
          <div
            key={article.id}
            className={`mb-4 p-4 border rounded-md ${isDarkMode ? 'border-gray-800 bg-black bg-opacity-40' : 'border-gray-200 bg-white'}`}
          >
            <a
              href={`/articles/${article.id}`}
              className={`text-xl font-semibold hover:underline ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              {article.title}
            </a>
            <p className={`text-gray-600 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Published on {new Date(article.created_at).toLocaleDateString()}
            </p>
            <div className={`mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
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