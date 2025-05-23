import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async (search = "") => {
    try {
      const res = await axios.get("http://localhost:5000/post/get", {
        params: { search }
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle search input change and fetch posts on input change (debounce if you want)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchPosts(value);
  };

  return (
    <div className="container mt-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

      <input
        type="text"
        placeholder="Search by title or content"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-4 p-2 border border-gray-300 rounded"
      />

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Summary</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.summary}</td>
                <td>{post.author}</td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
