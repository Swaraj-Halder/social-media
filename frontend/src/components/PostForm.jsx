import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuthContext} from '../../hooks/useAuthContext'


const PostForm = () => {
  const {user} = useAuthContext()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fetching, setFetching] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    console.log(formData.image)

    try {
      const response = await fetch('https://social-media-fxfa.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
        headers:{
          'Authorization' : `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result)
      setFetching(!fetching)
      setSuccess('Post created successfully');
      setError('');
      navigate("/")
      
    } catch (err) {
      setError('Failed to create post');
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto w-[85%] p-4 max-w-[600px] m-5">
      <h2 className="text-3xl font-semibold my-5">Upload Post</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 duration-150 text-white p-3 w-full  rounded-md"
          disabled={fetching}
        >
          Upload
        </button>
        {fetching && <div className="mt-4 text-green-600" >Uploading your post 😀</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </form>
    </div>
  );
};

export default PostForm;
