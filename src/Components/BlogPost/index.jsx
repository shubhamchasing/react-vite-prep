// App.js
import "./styles.css";
import data from "./postsData";
import { useState } from "react";
import PostCard from "./PostCard";

export default function BlogPosts() {
  const [posts, setPosts] = useState(data);

  return (
    <div className="container">
      <h2>Blog Posts </h2>
      <div className="blog-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
