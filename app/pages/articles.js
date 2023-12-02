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
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Articles</h1>
        {isLoggedIn && (
          <button
            onClick={() => router.push("/create-article")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Article
          </button>
        )}
      </div>

      <div className="mt-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="mb-4 p-4 border border-gray-200 rounded-md"
          >
            <a
              href={`/articles/${article.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {article.title}
            </a>
            <p className="text-gray-600">
              Published on {new Date(article.created_at).toLocaleDateString()}
            </p>
            <div className="mt-2">
              {article.content.length > 200
                ? `${article.content.substring(0, 200)}...`
                : article.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
