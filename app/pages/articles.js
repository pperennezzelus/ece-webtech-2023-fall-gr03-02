import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { useUser } from "../components/UserContext";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

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
    <div className="flex min-h-screen bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950"> 
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Articles</h1>
        {isLoggedIn && (
          <button
            onClick={() => router.push("/create-article")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Article
          </button>
        )}
      </div>

      <div className="mt-6 ">
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
            <p className="text-gray-600">
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
