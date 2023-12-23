import { useState } from "react";

const Comment = ({ comment, onDelete, canDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">{comment.comment}</p>
      {canDelete && (
        <button
          className="text-xs text-red-500 mt-2 cursor-pointer"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};

export default Comment;
