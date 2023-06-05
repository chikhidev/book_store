import React, { useState, useEffect } from 'react';

const EditUserProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });
  const [message, setMessage] = useState('');
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getInfos = async () => {
    fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          username: data.data.username,
          email: data.data.email,
          bio: data.data.bio,
        });
        setErr(data.success);
        setMessage(data.data.message);
      })
      .catch((error) => {
        setErr(true);
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    getInfos();
  }, [formData.username]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('http://localhost:4000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.data.message);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    formData.username && (
      <div className="py-4 mx-32">
        <h5 className="text-lg font-medium mb-2">{formData.username}</h5>
        {formData.isAdmin && (
          <div className="mb-2">
            <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded">
              Admin
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
        <p>{message}</p>
      </div>
    )
  );
};

export default EditUserProfile;
