import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get JWT from local storage
      const res = await axios.post(
        'http://localhost:5000/post',
        {
          title,
          content,
          is_public: isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Important part
          },
        }
      );

      alert('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post. Make sure you are logged in.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Create New Post</h2>
        <form onSubmit={handleSubmit}>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
