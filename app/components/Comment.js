import React from "react";
import { useContext } from "react";
import { DarkModeContext } from './DarkModeContext'; 


const Comment = ({ comment, onDelete, canDelete }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div className="p-4 border-t border-gray-200">
      {comment && comment.comment && (
        <p className={`text-sm  ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>{comment.comment}</p>
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
