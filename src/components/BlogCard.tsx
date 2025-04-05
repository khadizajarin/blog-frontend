import React from "react";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

interface BlogCardProps {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  likes: number;
  views: number;  // Change to number if views are count-based
  images: string[];
  authorImage: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  author,
  publishedDate,
  likes,
  views,
  images,
  authorImage,
}) => {
  return (
    <div className="bg-white  shadow-blue-600 shadow-[2px_0px_4px_2px_rgba(37,99,225,0.5)] rounded-xl p-4 w-[400px] border border-gray-200">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold">{title}</h2>

        <MdOutlineModeEdit className="text-grey-500 hover:bg-grey-200" />
      </div>

      {/* <div className="flex gap-2 my-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-[#003B95] text-white text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div> */}

      <p className="text-gray-600 text-sm">{description}</p>

      <div className="bg-blue-100 p-3 rounded-lg text-gray-700 text-sm mt-3">
        {description} {/* Dynamically show post description */}
        <a href="#" className="text-blue-600"> Read more</a>
      </div>

      <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
        <div className="flex items-center gap-1">
          <FaRegHeart /> {likes}
        </div>
        <div>{views}</div>  {/* Ensure views are displayed correctly */}
        <FaRegBookmark />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        {images.map((img, index) => (
          <img key={index} src={img} alt="Blog" className="w-full h-16 object-cover rounded-lg" />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <img src={authorImage} alt={author} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-gray-500">Published on: {publishedDate}</p>
        </div>
        <button className="ml-auto bg-[#003B95] text-white px-3 py-1 text-xs rounded-full">Follow</button>
      </div>
    </div>
  );
};

export default BlogCard;
