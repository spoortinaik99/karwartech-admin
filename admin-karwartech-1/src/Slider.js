import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Slider = () => {

    const [sliderFiles ,setSliderFiles] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [error, setError] = useState('');
    const [sliderImages, setSliderImages] = useState([]);
  
    useEffect(() => {
 
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

    const handleUploadSlider = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < sliderFiles.length; i++) {
          formData.append('sliderImages', sliderFiles[i]);
        }
    
        try {
          await axios.post('https://karwartech-backend.onrender.com/upload-slider', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSliderFiles([]);
        } catch (error) {
          setError('Failed to upload slider images');
        }
      };


  return (
    <div style={styles.container}>
    <h1 style={styles.heading}>Mobile Gallery</h1>
    <form onSubmit={handleUploadSlider} style={styles.form} encType="multipart/form-data">
    <input
        style={styles.input}
        type="file"
        multiple
        onChange={(e) => setSliderFiles(e.target.files)}
      />
          <button style={styles.button} type="submit">Upload Slider Images</button>
    </form>
    </div>
  )
}


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
  

export default Slider
