import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

const BlogSearchBar: React.FC = () => {
  return (
    <div className="bg-[#E0F7FA] p-4 rounded-lg flex flex-col md:flex-row items-center gap-4 w-full">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search blog by Title/Author’s name/Destination/Category"
          className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      
      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">Destination ▼</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">Category ▼</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">Sub-Category ▼</button>
      </div>
      
      {/* Sort & Reset */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center gap-1">
          <IoFilterSharp /> Sort by
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center gap-1">
          <MdRefresh /> Reset
        </button>
      </div>
    </div>
  );
};

export default BlogSearchBar;
