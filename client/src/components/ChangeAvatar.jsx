import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ChangeAvatar = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("Cliquez pour changer d'avatar");

  const uploadImage = async () => {
    setMessage('Traitement..');
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/user/profile/upload', {
        method: "POST",
        headers: {
        //   "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      data.data.message ? data.data.message : data.data[0].message
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    uploadImage();
  }, [image]);

  return (
    <motion.div
      className="flex items-center justify-center w-full my-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
        onChange={(e) => setImage(e.target.files[0])}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <motion.svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </motion.svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">
              {message}
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </motion.div>
  );
};

export default ChangeAvatar;
