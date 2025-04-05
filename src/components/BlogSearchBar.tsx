// import React, { useContext, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { IoFilterSharp } from "react-icons/io5";
// import { MdRefresh } from "react-icons/md";
// import { AuthContext } from "../lib/AuthProvider";
// import { useNavigate } from 'react-router-dom';
// import Profile from "./Profile";
// import axiosInstance from "../api/axiosInstance"; // Import axios instance for API calls

// const BlogSearchBar: React.FC = () => {
//   const authContext = useContext(AuthContext);
//   const navigate = useNavigate(); // Hook to navigate programmatically

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // Store search input
//   const [searchResults, setSearchResults] = useState([]); // Store search results

//   const user = authContext?.user;

//   const handleLogout = async () => {
//     if (authContext?.logOut) {
//       try {
//         await authContext.logOut(); // log out the user
//         navigate("/");
//       } catch (error) {
//         console.error("Logout error:", error);
//       }
//     } else {
//       console.error("AuthContext is not available or logOut is undefined");
//     }
//   };

//   const handleSearch = async () => {
//     if (searchQuery.trim() === "") return; // Avoid empty search requests

//     try {
//       const response = await axiosInstance.get(`posts/search?q=${searchQuery}`);
//       setSearchResults(response.data); // Set the results based on search
//     } catch (err: any) {
//       console.error("Error searching for posts:", err.response?.data || err.message);
//     }
//   };

//   const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value); // Update the query state when input changes
//   };

//   return (
//     <div className="bg-[#E0F7FA] p-4 rounded-lg max-w-[120rem] mx-auto">
//       {/* Search Bar */}
//       <div className="relative flex flex-row gap-3 justify-center items-center w-full">
//         <div className="w-3/4">
//           <input
//             type="text"
//             placeholder="Search blog by Title/Author’s name/Destination/Category"
//             className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none"
//             value={searchQuery} // Bind input field to searchQuery state
//             onChange={handleSearchInputChange} // Update searchQuery on input change
//           />
//           <FaSearch className="absolute left-45 top-1/2 transform -translate-y-1/2 text-gray-500" />
//         </div>

//         <div>
//           <button
//             onClick={handleSearch}
//             className="bg-[#003B95] text-white px-8 py-3 rounded-full"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="p-4 flex justify-evenly max-w-[120rem] mx-auto">
//         {/* Filter Buttons */}
//         <div className="flex gap-2 ">
//           <button className="px-4 py-2 rounded-lg bg-transparent text-[#003B95] border-[#003B95] border-2">Destination ▼</button>
//           <button className="px-4 py-2 rounded-lg bg-transparent text-[#003B95] border-[#003B95] border-2">Category ▼</button>
//           <button className="px-4 py-2 rounded-lg bg-transparent text-[#003B95] border-[#003B95] border-2">Sub-Category ▼</button>
//         </div>

//         {/* Sort & Reset */}
//         <div className="flex items-center gap-2">
//           <button className="px-4 py-2 bg-gray-200 rounded-lg text-black border-gray-300 border-[1px] flex items-center gap-1">
//             <IoFilterSharp /> Sort by
//           </button>
//           <button className="px-4 py-2 bg-gray-200 rounded-lg text-black border-gray-300 border-[1px] flex items-center gap-1">
//             <MdRefresh /> Reset
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-[#003B95] text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//           <button
//             className="flex items-center gap-2 px-3 py-2 rounded-full border hover:shadow"
//             onClick={() => setIsModalOpen(true)}
//           >
//             {user?.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//             ) : (
//               <>
//                 <span className="text-sm font-medium text-gray-700">Edit Profile</span>
//               </>
//             )}
//           </button>

        
//       </div>

//       {/* Display search results */}
//       <div>
//         {searchResults.length > 0 ? (
//           searchResults.map((post: any) => (
//             <div key={post._id} className="p-4 border-b border-gray-300">
//               <h3 className="text-xl font-semibold">{post.title}</h3>
//               <p>{post.summary}</p>
//             </div>
//           ))
//         ) : (
//           <p>No search results found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogSearchBar;
