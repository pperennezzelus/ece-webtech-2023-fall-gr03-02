import React from "react";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Comment = ({ comment, onDelete, canDelete }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`p-4 border-t border-gray-200 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-black"}`}>
        {comment.user_name}: {comment.comment}
      </p>
      {!isReply && (
        <button
          onClick={handleReply}
          className="text-xs text-blue-500 cursor-pointer"
        >
          Reply
        </button>
      )}
      {/* Use 'canDeleteComment' for the Delete button */}
      {canDeleteComment && (
        <button
          onClick={() => onDelete(comment.id)}
          className="text-xs text-red-500 cursor-pointer"
        >
          Delete
        </button>
      )}

      {replyingTo === comment.id && (
        <form onSubmit={handleSubmitReply} className="mt-4">
          <textarea
            className={`w-full p-2 border rounded-md ${
              isDarkMode ? "text-white bg-gray-800" : "text-gray-500 bg-white"
            }`}
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows="3"
          />
          <button
            type="submit"
            className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-300"
            }`}
          >
            Post Reply
          </button>
        </form>
      )}

      {comment.replies?.map((reply) =>
        reply ? (
          <Comment
            key={reply.id}
            comment={reply}
            onDelete={onDelete}
            onReplyClick={onReplyClick}
            isReply={true}
            user={user}
            setComments={setComments}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        ) : null
      )}
    </div>
  );
};

export default Comment;
