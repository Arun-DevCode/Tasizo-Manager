import React, { useState, useEffect, useRef } from "react";
import { deleteTask } from "../api/tasks";


const TaskCard = ({ task }) => {
  const { title, status, description, deadLine } = task;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-all h-full relative">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-800 text-lg line-clamp-1 pr-6">
          {title}
        </h3>

        {/* Options Menu Wrapper */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl z-10 py-1 overflow-hidden">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
              >
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  deleteTask(task._id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${
            status === "Completed"
              ? "bg-green-100 text-green-700"
              : status === "In Progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-500 text-sm line-clamp-3 grow mt-1">
        {description}
      </p>

      <div className="pt-4 mt-auto border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
        <span>Deadline:</span>
        <span className="font-medium text-gray-700">{deadLine}</span>
      </div>
    </div>
  );
};

export default TaskCard;
