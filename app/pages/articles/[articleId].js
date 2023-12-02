// pages/articles/[articleId].js
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";

const ArticlePage = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="mb-4 text-gray-600">
        Published on {new Date(article.created_at).toLocaleDateString()}
      </p>
      <div className="mb-4">{article.content}</div>
      {article.image_urls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Image ${index + 1}`}
          className="my-4"
        />
      ))}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.articleId)
    .single();

  return { props: { article } };
}

export default ArticlePage;
