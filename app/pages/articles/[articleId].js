import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "../../components/UserContext";
import { DarkModeContext } from "../../components/DarkModeContext";
import Link from "next/link";

const ArticlePage = ({ article }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchCommentsAndUsers = async () => {
    try {
      let { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select(
          "id, article_id, user_id, comment, created_at, parent_comment_id"
        )
        .eq("article_id", article.id);

      if (commentsError) throw commentsError;

      const userIds = commentsData.map((comment) => comment.user_id);
      let { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, name, lastname")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      const enrichedComments = commentsData.map((comment) => {
        const profile = profilesData.find((p) => p.id === comment.user_id);
        const user_name = profile
          ? `@${profile.name} ${profile.lastname}`
          : "Unknown user";
        return {
          ...comment,
          user_name,
          created_at: comment.created_at
            ? new Date(comment.created_at).toLocaleString()
            : "Invalid date",
          replies: [],
        };
      });

      const threadedComments = [];
      enrichedComments.forEach((comment) => {
        if (!comment.parent_comment_id) {
          threadedComments.push(comment);
        } else {
          const parentComment = threadedComments.find(
            (c) => c.id === comment.parent_comment_id
          );
          if (parentComment) {
            parentComment.replies.push(comment);
          }
        }
      });

      setComments(threadedComments);
    } catch (error) {
      console.error("Error fetching comments and profiles:", error.message);
    }
  };

  useEffect(() => {
    if (article) {
      fetchCommentsAndUsers();
    }
  }, [article]);

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

      if (error) throw error;

      setComments([
        ...comments,
        {
          ...data,
          user_name: `@${user.user_metadata.full_name}`,
          created_at: new Date().toLocaleString(),
          replies: [],
        },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            article_id: article.id,
            user_id: user.id,
            comment: replyContent.trim(),
            parent_comment_id: replyingTo,
          },
        ])
        .single();

      if (error) throw error;

      const updatedComments = comments.map((c) => {
        if (c.id === replyingTo) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                ...data,
                user_name: `@${user.user_metadata.full_name}`,
                created_at: new Date().toLocaleString(),
              },
            ],
          };
        }
        return c;
      });

      setComments(updatedComments);
      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error posting reply:", error.message);
    }
  };

  const handleDeleteCommentOrReply = async (commentId, isReply = false) => {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      if (isReply) {
        const updatedComments = comments.map((c) => {
          if (c.replies.find((r) => r.id === commentId)) {
            return {
              ...c,
              replies: c.replies.filter((r) => r.id !== commentId),
            };
          }
          return c;
        });
        setComments(updatedComments);
      } else {
        setComments(
          comments.filter(
            (c) => c.id !== commentId && c.parent_comment_id !== commentId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleDeleteArticle = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      await supabase.from("comments").delete().eq("article_id", article.id);
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", article.id);

      if (error) throw error;

      router.push("/articles");
    } catch (error) {
      console.error("Error deleting article:", error.message);
    }
  };

  const handleReply = (parentCommentId) => {
    setReplyingTo(parentCommentId);
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
          Published on {new Date(article.created_at).toLocaleDateString()} by{" "}
          <span className={`text-green-500`}>{article.author}</span>
          {article.game && (
            <span className={`ml-2 text-blue-500`}>Game: {article.game}</span>
          )}
          {article.region && (
            <span className={`ml-2 text-red-500`}>
              Region: {article.region}
            </span>
          )}
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
                  className={`text-red-500 hover:text-red-700`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className={`text-gray-500 hover:text-gray-700`}
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
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <p>{comment.comment}</p>
              <p className="text-gray-400 text-sm">
                {comment.user_name} - {comment.created_at}
              </p>
              {isLoggedIn && user.id === comment.user_id && (
                <div className="comment-action flex space-x-4">
                  <button
                    onClick={() => handleDeleteCommentOrReply(comment.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Reply
                  </button>
                </div>
              )}
              {comment.replies.map((reply) => (
                <div key={reply.id} className="ml-4">
                  <p>{reply.comment}</p>
                  <p className="text-gray-400 text-sm">
                    {reply.user_name} - {reply.created_at}
                  </p>
                  {isLoggedIn && user.id === reply.user_id && (
                    <div className="comment-action flex space-x-4">
                      <button
                        onClick={() =>
                          handleDeleteCommentOrReply(reply.id, true)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleReply(reply.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {replyingTo === comment.id && (
                <form onSubmit={handleSubmitReply}>
                  <textarea
                    className={`w-full p-2 border rounded-md ${
                      isDarkMode
                        ? "text-white bg-gray-800"
                        : "text-gray-500 bg-white"
                    }`}
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows="3"
                  ></textarea>
                  <button
                    type="submit"
                    className={`mt-2 px-4 py-2 text-blue-500 bg-blue-100 rounded hover:text-white hover:bg-blue-500`}
                  >
                    Post Reply
                  </button>
                </form>
              )}
            </div>
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
                className={`mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700`}
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
