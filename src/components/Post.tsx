/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Posts.tsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import BlogSearchBar from './BlogSearchBar';
import BlogCard from './BlogCard';

interface Post {
  title: string;
  tags: string[];
  description: string;
  author: string;
  publishedDate: string;
  likes: number;
  views: string;
  images: string[];
  authorImage: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('posts');
        console.log('Fetched posts:', response.data); // Debugging line
        setPosts(response.data);
        console.log(response.data);
      } catch (err: any) {
        console.error('Error fetching posts:', err.response?.data || err.message);
        setError('Error fetching posts');
      }
    };
    fetchPosts();
  }, []);
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <BlogSearchBar />
      
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => (
          <div  className="my-4">
            <BlogCard 
              title={post.title}
              tags={post.tags}
              description={post.description}
              author={post.author}
              publishedDate={post.publishedDate}
              likes={post.likes}
              views={post.views}
              images={post.images}
              authorImage={post.authorImage}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;