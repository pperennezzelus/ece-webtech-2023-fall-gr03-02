import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "../../components/UserContext";
import Comment from "../../components/Comment";
import { DarkModeContext } from "../../components/DarkModeContext";
import Link from "next/link";

const ArticlePage = ({ article }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [shouldRefetchComments, setShouldRefetchComments] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

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

      // Remove the deleted comment from the comments state
      setComments((comments) =>
        comments.filter((comment) => comment.id !== commentId)
      );
      setShouldRefetchComments((prev) => !prev);
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleDeleteArticle = async () => {
    try {
      // If the confirmation is not shown, prompt the user
      if (!showConfirmation) {
        setShowConfirmation(true);
        return;
      }

      // Delete comments associated with the article
      const { error: commentsError } = await supabase
        .from("comments")
        .delete()
        .eq("article_id", article.id);

      if (commentsError) {
        throw commentsError;
      }

      // Delete the article itself
      const { error: articleError } = await supabase
        .from("articles")
        .delete()
        .eq("id", article.id);

      if (articleError) {
        throw articleError;
      }

      // Redirect the user after successful deletion
      router.push("/articles");
    } catch (error) {
      console.error("Error deleting article:", error.message);
    }
  };

  return (
    <div
      className={`flex h-full min-h-screen bg-cover h-14 ${
        isDarkMode
          ? "bg-gradient-to-b from-indigo-950 to-slate-950"
          : "bg-gradient-to-b from-white to-slate-400"
      }`}
    >
      <div
        className={`container mx-auto p-6 my-6 ${
          isDarkMode ? "bg-black bg-opacity-40" : "bg-white"
        } rounded-md shadow-md`}
      >
        <h1
          className={`text-3xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {article.title}
        </h1>
        <p className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-500"}`}>
          Published on {new Date(article.created_at).toLocaleDateString()}
        </p>
        <div
          className={`article-content mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
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
        {isLoggedIn && user && user.id === article.user_id && (
          <div className="flex items-center space-x-4">
            <Link href={`/update-article/${article.id}`} passHref>
              <button className="text-blue-500 hover:text-blue-700">
                Edit Article
              </button>
            </Link>
            <button
              onClick={() => setShowConfirmation(true)}
              className="text-red-500 hover:text-red-700"
            >
              Delete Article
            </button>
            {showConfirmation && (
              <div className="flex space-x-4">
                <p className={`${isDarkMode ? "text-white" : "text-black"}`}>
                  Are you sure?
                </p>
                <button
                  onClick={handleDeleteArticle}
                  className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ${
                    isDarkMode ? "bg-red-500" : "bg-red-300"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ${
                    isDarkMode ? "bg-gray-500" : "bg-gray-300"
                  }`}
                >
                  No
                </button>
              </div>
            )}
          </div>
        )}
        <div className="comments-section mt-8">
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Comments
          </h2>
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
              } // Check if the comment can be deleted by the user
            />
          ))}
          {isLoggedIn && (
            <form onSubmit={handleSubmitComment} className="mt-4">
              <textarea
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "text-white bg-gray-800"
                    : "text-gray-500 bg-white"
                }`}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
              ></textarea>
              <button
                type="submit"
                className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${
                  isDarkMode ? "bg-blue-500" : "bg-blue-300"
                }`}
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
