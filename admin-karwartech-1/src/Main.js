
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMobileForm = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [addedData, setAddedData] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name); // Append name to FormData
        formData.append('price', price); // Append price to FormData
    
        axios.post('https://karwartech-backend.onrender.com/upload', formData)
            .then(res => {
                console.log('File uploaded successfully');
                // Fetch the added data after successful upload
                fetchAddedData(); // Fetch added data here
            })
            .catch(err => {
                console.error('Error uploading file:', err);
                // Handle error
            });
    };
    
    const fetchAddedData = () => {
        axios.get('https://karwartech-backend.onrender.com/added-data')
            .then(res => {
                console.log('Added data:', res.data);
                // Update state with the fetched data
                setAddedData(res.data);
            })
            .catch(err => {
                console.error('Error fetching added data:', err);
                // Handle error
            });
    };
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        // Fetch mobile data from the backend when the component mounts
        axios.get('https://karwartech-backend.onrender.com/added-data')
            .then(res => {
                // Update state with fetched mobile data
                setMobiles(res.data);
            })
            .catch(err => {
                console.error('Error fetching mobile data:', err);
                // Handle error
            });
    }, []);
    
    // Fetch added data when the component mounts
    useEffect(() => {
        fetchAddedData();
    }, []);


    const handleClearData = () => {
        axios.delete('https://karwartech-backend.onrender.com/clear-data')
            .then(res => {
                console.log('All mobile data cleared successfully');
                // Optionally, update state or trigger any other action after data is cleared
            })
            .catch(err => {
                console.error('Error clearing mobile data:', err);
                // Handle error
            });
    };

    return (
        <div>
           <div class="container">
            <h1>Admin KarwarTech</h1>
    <form>
        <div class="form-group">
            <label for="fileUpload">Upload File</label>
            <input type="file" class="form-control-file" id="fileUpload" onChange={handleFileChange} />
        </div>
        <div class="form-group">
            <label for="nameInput">Name</label>
            <input type="text" class="form-control" id="nameInput" value={name} onChange={handleNameChange} placeholder="Enter name" />
        </div>
        <div class="form-group">
            <label for="priceInput">Price</label>
            <input type="text" class="form-control" id="priceInput" value={price} onChange={handlePriceChange} placeholder="Enter price" />
        </div>
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Upload</button>
        <button type="button" class="btn btn-danger" onClick={handleClearData}>Clear All Data</button>
    </form>
</div>

<div className="container">
    <div className="row">
        {mobiles.map(mobile => (
            <div className="col-md-4 mb-3" key={mobile._id}>
                <div className="card">
                    <img src={`https://karwartech-backend.onrender.com/${mobile.filePath}`} className="card-img-top" alt={mobile.name} style={{ maxWidth: '200px', margin: 'auto' }} />
                    <div className="card-body">
                        <h5 className="card-title">{mobile.name}</h5>
                        <p className="card-text">Price: {mobile.price}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

        </div>
    );
};

export default AddMobileForm;