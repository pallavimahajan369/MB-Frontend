import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/post/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setTitle(res.data.title);
        setContent(res.data.content);
        setIsPublic(res.data.is_public); // ✅ Correct field for checkbox
      } catch (err) {
        setMessage('Failed to load post');
        setMsgType('error');
        setTimeout(() => navigate('/myposts'), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/post/${id}`,
        {
          title,
          content,
          is_public: isPublic, // ✅ Sending the right field to backend
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Post updated successfully!');
      navigate('/myposts');
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update post. Make sure you are logged in.');
    }
  };

  if (loading) return <p className="text-center mt-5">Loading post...</p>;

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Edit Post</h2>

        {message && (
          <div className={`alert ${msgType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              id="isPublicCheck"
            />
            <label className="form-check-label" htmlFor="isPublicCheck">
              Make this post public
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
