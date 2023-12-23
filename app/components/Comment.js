import React from "react";

const Comment = ({ comment, onDelete, canDelete }) => {
  return (
    <div className="p-4 border-t border-gray-200">
      {comment && comment.comment && (
        <p className="text-sm text-gray-600">{comment.comment}</p>
      )}
      {canDelete && (
        <button
          className="text-xs text-red-500 mt-2 cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Comment;
