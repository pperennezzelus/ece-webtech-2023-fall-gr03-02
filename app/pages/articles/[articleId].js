// pages/articles/[articleId].js
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
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("article_id", article.id);

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [article, shouldRefetchComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

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
      console.error("Error posting comment:", error);
    } else {
      setComments((comments) => [...comments, data]);
      setNewComment("");
      setShouldRefetchComments((prev) => !prev);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Error deleting comment:", error);
    } else {
      // Remove the deleted comment from the comments state
      setComments((comments) =>
        comments.filter((comment) => comment.id !== commentId)
      );
      setShouldRefetchComments((prev) => !prev);
    }
  };

  return (
    <div className="container mx-auto p-6 my-6 bg-black bg-opacity-40 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
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
            canDelete={isLoggedIn && comment.user_id === user?.id} // Check if the comment can be deleted by the user
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
  );
};

export async function getServerSideProps({ params }) {
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.articleId)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    return { props: { article: null } };
  }

  return { props: { article } };
}

export default ArticlePage;
