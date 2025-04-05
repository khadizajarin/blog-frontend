import React, { useContext, useState } from "react";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdOutlineModeEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import BlogForm from "./BlogForm";
import { AuthContext } from "../lib/AuthProvider";

interface BlogCardProps {
  _id: string,
  title: string;
  description: string;
  author: string;
  authorEmail: string;
  category: string;
  subcategory: string;
  createdAt: string;
  summary:string;
  likes: number;
  views: number; 
  images: File[];
  authorImage: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ _id,title, description, author, authorEmail, category, subcategory, createdAt, summary, likes, views, images,}) => {
  const authContext = useContext(AuthContext);
    const { user } = authContext!;
  
  // State to track the starting index of the current set of 3 images
  const [startIndex, setStartIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Function to go to the next set of 3 images
  const nextSet = () => {
    setStartIndex((prevIndex) => (prevIndex + 3) % images.length);
  };

  // Function to go to the previous set of 3 images
  const prevSet = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - 3 + images.length) % images.length
    );
  };

  // Get the current set of 3 images
  const currentImages = images.slice(startIndex, startIndex + 3);

  // Check if navigation buttons should be displayed
  const showNavigation =
    images.length > 3; // Show navigation only if there are more than 3 images

  

  return (
    <div className="bg-white shadow-blue-300 shadow-[2px_0px_4px_2px_rgba(37,99,225,0.5)] rounded-xl p-6 lg:w-[35rem] md:w-[25rem] border border-gray-200">
      
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold">{title}</h2>
        {user?.email === authorEmail && (
          <MdOutlineModeEdit
            className="text-gray-500 hover:bg-gray-200 border-2 border-gray-400 p-1 w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}

      </div>

      {isEditing && (
         <BlogForm  isOpen={isEditing} onClose={() => setIsEditing(false)}  postToEdit={{
          _id,
          title,
          description,
          author,
          authorEmail,
          category,
          subcategory,
          summary,
          images,
        }}></BlogForm>
        )}

      <div className="flex text-white my-4 text-xs gap-2">
        {category && <p className="bg-[#003B95] px-2 py-1 rounded-full">{category}</p>}
        {subcategory && <p className="bg-[#003B95] px-2 py-1 rounded-full">{subcategory}</p>}
      </div>


      <p className="text-gray-600 text-sm">{summary}</p>

      <div className="bg-blue-100 p-3 rounded-lg text-gray-700 text-sm mt-3">
        {description}
        <a href="#" className="text-blue-600">
          Read more
        </a>
      </div>


      <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
        <div className="flex items-center justify-start w-1/3">
          <div className="flex items-center gap-1">
            <FaRegHeart /> {likes ?? 0}
          </div>
          <div className="pl-4 flex items-center gap-1">
            <MdOutlineRemoveRedEye /> {views ?? 0}
          </div>
        </div>
        <FaRegBookmark />
      </div>


      {/* Image Slider */}
      {images.length > 0 && (
        <div className="relative mt-3">
          <div className="w-full overflow-hidden">
            <div className="flex gap-1">
              {currentImages.map((img, index) => (
                <img
                  key={index}
                  src={img instanceof File ? URL.createObjectURL(img) : img} 
                  alt={`Blog ${index}`}
                  className="w-1/3 h-20 object-cover rounded-lg transition-all duration-500"
                />
              ))}
            </div>
          </div>

          {/* Slider controls (only shown if there are more than 3 images) */}
          {showNavigation && (
            <>
              <button
                onClick={prevSet}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-400 bg-opacity-50 text-white px-2 rounded-full"
              >
                &#8249;
              </button>
              <button
                onClick={nextSet}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-400 bg-opacity-50 text-white px-2 rounded-full"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <img src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"} alt={author} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-gray-500">
            Published on: {new Date(createdAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
            

        </div>
        <button className="ml-auto bg-[#003B95] text-white px-3 py-1 text-xs rounded-full">
          Follow
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
