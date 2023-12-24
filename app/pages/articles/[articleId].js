import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "../../components/UserContext";
import Comment from "../../components/Comment";

const ArticlePage = ({ article }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!article) {
      console.error("No article data!");
      return;
    }

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("article_id", article.id);

        if (error) {
          throw error;
        }

        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, [article, shouldRefetchComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            article_id: article.id,
            user_id: user.id,
            comment: newComment.trim(),
          },
        ])
        .single();

      if (error) {
        throw error;
      }

      setComments([...comments, data]);
      setNewComment("");
      setShouldRefetchComments((prev) => !prev);
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        throw error;
      }

      setComments((comments) =>
        comments.filter((comment) => comment.id !== commentId)
      );
      setShouldRefetchComments((prev) => !prev);
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-cover bg-gradient-to-b from-indigo-950 to-slate-950">
      <div className="container mx-auto p-6 my-6 bg-black bg-opacity-40 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>

        {/* Game and Region with Colored Labels */}
        <div className="mb-4">
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2">
            {article.game}
          </span>
          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {article.region}
          </span>
        </div>

        <div
          className="article-content mb-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        {article.image_urls &&
          article.image_urls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              className="my-4"
            />
          ))}
        <div className="comments-section mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Comments</h2>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              onDelete={() => handleDeleteComment(comment.id)}
              canDelete={
                isLoggedIn &&
                user &&
                comment &&
                comment.user_id &&
                comment.user_id === user.id
              }
            />
          ))}
          {isLoggedIn && (
            <form onSubmit={handleSubmitComment} className="mt-4">
              <textarea
                className="w-full p-2 text-gray-700 border rounded-md"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Post Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const { data: article, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", params.articleId)
      .single();

    if (error) {
      throw error;
    }

    return { props: { article } };
  } catch (error) {
    console.error("Error fetching article:", error.message);
    return { props: { article: null } };
  }
}

export default ArticlePage;
