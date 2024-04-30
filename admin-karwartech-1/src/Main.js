import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMobileForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMobiles();
  }, []);

  const fetchMobiles = async () => {
    try {
      const response = await axios.get('https://karwartech-backend.onrender.com/added-data');
      setMobiles(response.data);
    } catch (error) {
      setError('Failed to fetch mobile data');
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await axios.post('https://karwartech-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchMobiles();
    } catch (error) {
      setError('Failed to upload files');
    }
  };

  return (
    <div>
      <h1>Mobile Gallery</h1>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit">Upload</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        <h2>Uploaded Mobiles</h2>
        <ul>
        {mobiles.map((mobile) => (
  <li key={mobile._id}>
    <p>Name: {mobile.name}</p>
    <p>Price: {mobile.price}</p>
    <div>
      {mobile.filePaths.map((filePath, index) => (
        <img
          key={index}
          src={`https://karwartech-backend.onrender.com/${filePath}`}
          alt={`${mobile.name} - Image ${index + 1}`}
        />
      ))}
    </div>
  </li>
))}
        </ul>
      </div>
    </div>
  );
};

export default AddMobileForm;
