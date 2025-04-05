import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import { MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../lib/AuthProvider';
import { useContext } from 'react';
import Profile from './Profile';

interface Post {
  _id: string;
  authorEmail: string;
  createdAt: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  author: string;
  summary: string;
  publishedDate: string;
  likes: number;
  views: number;
  images: File[]; // Assuming images are URLs or image paths
  authorImage: string;
}

const categories = [
  { value: "tech", label: "Tech" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "hiking", label: "Hiking" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "fashion", label: "Fashion" },
  { value: "finance", label: "Finance" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "sports", label: "Sports" },
];

const subcategories = [
  { value: "ai", label: "AI" },
  { value: "ml", label: "Machine Learning" },
  { value: "nature", label: "Nature" },
  { value: "adventure", label: "Adventure" },
  { value: "deep-learning", label: "Deep Learning" },
  { value: "wildlife", label: "Wildlife" },
  { value: "coding", label: "Coding" },
  { value: "camping", label: "Camping" },
  { value: "budget-travel", label: "Budget Travel" },
  { value: "recipes", label: "Recipes" },
  { value: "fitness", label: "Fitness" },
  { value: "self-help", label: "Self Help" },
];

const Posts: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [subcategoryMenuOpen, setSubcategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Store search input
  const [searchResults, setSearchResults] = useState<Post[]>([]); // Store search results
  const user = authContext?.user;

  const handleCategoryToggle = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
    setSubcategoryMenuOpen(false); // Close subcategory menu if category is opened
  };

  const handleSubcategoryToggle = () => {
    setSubcategoryMenuOpen(!subcategoryMenuOpen);
    setCategoryMenuOpen(false); // Close category menu if subcategory is opened
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCategoryMenuOpen(false); // Close menu after selection
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setSubcategoryMenuOpen(false); // Close menu after selection
  };

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get('posts');
      setPosts(response.data);
    } catch (err: any) {
      console.error('Error fetching posts:', err.response?.data || err.message);
      setError('Error fetching posts');
    }
  };

  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 10000); // 10 seconds interval

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    if (authContext?.logOut) {
      try {
        await authContext.logOut();
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      console.error('AuthContext is not available or logOut is undefined');
    }
  };

   // Filter posts based on selected category and subcategory
   const filteredPosts = posts.filter((post) => {
    const isCategoryMatch = selectedCategory ? post.category == selectedCategory : true;
    const isSubcategoryMatch = selectedSubcategory ? post.subcategory == selectedSubcategory : true;
    return isCategoryMatch || isSubcategoryMatch;
  });
  
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);  // Clear search results if query is empty
      return;
    }

    try {
      const response = await axiosInstance.get(`posts/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (err: any) {
      console.error('Error searching for posts:', err.response?.data || err.message);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setPosts(posts); // Reset to original posts if search query is cleared
    }
  }, [searchQuery, posts]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#E0F7FA] h-full pb-10">
      {/* Search Bar */}
      <div className="bg-[#E0F7FA] p-4 rounded-lg max-w-[120rem] mx-auto">
        <div className="relative flex flex-row gap-3 justify-center items-center w-full">
          <div className="w-3/4">
            <input
              type="text"
              placeholder="Search blog by Title/Author’s name/Category/Sub-Category"
              className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <FaSearch className="absolute left-45 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div>
            <button onClick={handleSearch} className="bg-[#003B95] text-white px-8 py-3 rounded-full">
              Search
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="p-4 flex justify-evenly max-w-[120rem] mx-auto">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-transparent text-[#003B95] border-[#003B95] border-2">Destination ▼</button>
            {/* Category filter */}
            <button className="px-4 py-2 rounded-lg bg-transparent text-[#003B95] border-[#003B95] border-2"  onClick={handleCategoryToggle}>  {selectedCategory ? selectedCategory : "Category ▼"}</button>
            {categoryMenuOpen && (
            <div className="absolute lg:left-120 lg:top-30 bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
              <ul>
                {categories.map((category) => (
                  <li
                    key={category.value}
                    className="px-4 py-2 cursor-pointer hover:bg-[#003B95] hover:text-white"
                    onClick={() => handleCategorySelect(category.label)}
                  >
                    {category.label}
                  </li>
                ))}
              </ul>
            </div>
            )}
           {/* Subcategory filter */}
            <button className="px-4 py-2 rounded-lg bg-transparent text-[#003B95] border-[#003B95] border-2"  onClick={handleSubcategoryToggle}> {selectedSubcategory ? selectedSubcategory : "Sub-Category ▼"}</button>
            {subcategoryMenuOpen && (
              <div className="absolute lg:left-140 lg:top-30 bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
                <ul>
                  {subcategories.map((subcategory) => (
                    <li
                      key={subcategory.value}
                      className="px-4 py-2 cursor-pointer hover:bg-[#003B95] hover:text-white"
                      onClick={() => handleSubcategorySelect(subcategory.label)}
                    >
                      {subcategory.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-black border-gray-300 border-[1px] flex items-center gap-1">
              <IoFilterSharp /> Sort by
            </button>
            <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-black border-gray-300 border-[1px] flex items-center gap-1"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
              >
                <MdRefresh /> Reset
            </button>

            <button onClick={handleLogout} className="bg-[#003B95] text-white px-4 py-2 rounded">
              Logout
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-full border hover:shadow" onClick={() => setProfileModalOpen(true)}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-gray-700">Edit Profile</span>
              )}
            </button>

            <Profile isProfileOpen={isProfileModalOpen} onProfileClose={() => setProfileModalOpen(false)} />
          </div>
        </div>
      </div>

      {/* Display search results using BlogCard */}
      <div className="lg:pl-8 flex flex-wrap">
        {/* Display search results if there are any */}
        {searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div key={post._id} className="my-4 w-full md:w-1/2 lg:w-1/3">
            <BlogCard {...post} />
          </div>
        ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post._id} className="my-4 w-full md:w-1/2 lg:w-1/3">
              <BlogCard {...post} />
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="my-4 w-full md:w-1/2 lg:w-1/3">
              <BlogCard {...post} />
            </div>
          ))
        ) : (
          <div>No posts found.</div>
        )}
      </div>


      {/* Add Blog Button */}
      <div className="pl-8">
        <button onClick={() => setModalOpen(true)} className="bg-[#003B95] text-white px-4 py-2 rounded">
          Post Your Blog
        </button>
      </div>
      <BlogForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Posts;
