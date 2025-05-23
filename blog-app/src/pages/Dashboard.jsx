import { useEffect, useState } from 'react';
import axios from 'axios';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/post/myposts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      alert('Failed to load your posts');
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== postId));
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <center>
      <div className="min-vh-100 bg-light py-5 px-3 w-100">
        <h1 className="text-primary mb-4">My Posts</h1>

        <div className="table-responsive w-100">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th className="text-center">Visibility</th>
                <th className="text-center">Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No posts found.
                  </td>
                </tr>
              )}
              {posts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{post.title}</td>
                  <td>
                    {post.content.length > 50
                      ? post.content.substring(0, 50) + '...'
                      : post.content}
                  </td>
                  <td className="text-center">
                    {post.is_public ? 'Public' : 'Private'}
                  </td>
                  <td className="text-center">
                    {new Date(post.created_at).toLocaleString()}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id);
                      }}
                      className="btn btn-sm btn-danger me-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/post/${post.id}`;
                      }}
                      className="btn btn-sm btn-warning text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPost && (
          <div className="mt-4 p-4 bg-white border rounded shadow w-100" style={{ maxWidth: '800px' }}>
            <h2 className="h4 text-primary">{selectedPost.title}</h2>
            <p className="text-muted mb-2">
              {selectedPost.is_public ? 'Public' : 'Private'} |{' '}
              {new Date(selectedPost.created_at).toLocaleString()}
            </p>
            <p className="text-dark" style={{ whiteSpace: 'pre-wrap' }}>
              {selectedPost.content}
            </p>
          </div>
        )}
      </div>
    </center>
  );
};

export default MyPosts;
