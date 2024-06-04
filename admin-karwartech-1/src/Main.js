import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMobileForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([]);
  const [sliderFiles ,setSliderFiles] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState('');
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    fetchMobiles();
    fetchSliderImages();
  }, []);


  const fetchSliderImages = async () => {
    try {
      const response = await axios.get('https://karwartech-backend.onrender.com/slider-images');
      setSliderImages(response.data);
    } catch (error) {
      setError('Failed to fetch slider images');
    }
  };

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


  const handleClearData = async () => {
    try {
      await axios.delete('https://karwartech-backend.onrender.com/clear-data');
      setMobiles([]);
    } catch (error) {
      setError('Failed to clear mobile data');
    }
  };

  const deleteMobile = async (id) => {
    try {
      await axios.delete(`https://karwartech-backend.onrender.com/mobile/${id}`);
      // After successful deletion, fetch updated mobile data
      fetchMobiles();
    } catch (error) {
      setError('Failed to delete mobile');
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mobile Gallery</h1>
      <form onSubmit={handleUpload} style={styles.form} encType="multipart/form-data">
        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          style={styles.input}
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        
        <button style={styles.button} type="submit">Upload</button>

    
       
      </form>
    
      <button style={styles.button} onClick={handleClearData}>Clear All</button>

      {error && <p style={styles.error}>{error}</p>}

      <div>
        <h2 style={styles.subHeading}>Uploaded Mobiles</h2>
        <ul style={styles.mobileList}>
          {mobiles.map((mobile) => (
            <li key={mobile._id} style={styles.mobileItem}>
              <p style={styles.mobileDetail}>Name: {mobile.name}</p>
              <p style={styles.mobileDetail}>Price: {mobile.price}</p>
              <div style={styles.imageContainer}>
                {mobile.filePaths.map((filePath, index) => (
                  <img
                    key={index}
                    src={`https://karwartech-backend.onrender.com/${filePath}`}
                    alt={`${mobile.name} - Image ${index + 1}`}
                    style={styles.image}
                  />
                ))}
              </div>
              <button onClick={() => deleteMobile(mobile._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h2 style={styles.subHeading}>Uploaded Mobiles</h2>
        <ul style={styles.mobileList}>
          {sliderImages.map((mobile) => (
            <li key={mobile._id} style={styles.mobileItem}>
              <p style={styles.mobileDetail}>Name: {mobile.name}</p>
              <p style={styles.mobileDetail}>Price: {mobile.price}</p>
              <div style={styles.imageContainer}>
                {mobile.filePaths.map((filePath, index) => (
                  <img
                    key={index}
                    src={`https://karwartech-backend.onrender.com/${filePath}`}
                    alt={`${mobile.name} - Image ${index + 1}`}
                    style={styles.image}
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

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  mobileList: {
    listStyleType: 'none',
    padding: '0',
  },
  mobileItem: {
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
  },
  mobileDetail: {
    marginBottom: '5px',
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
};

export default AddMobileForm;