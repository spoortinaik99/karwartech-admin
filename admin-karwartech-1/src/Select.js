import React from 'react'
import { useNavigate } from 'react-router-dom';

const Select = () => {
    const navigate = useNavigate();

    const navigateMobile = ()=>{
        navigate('/upload');
    }
    const navigateAcessories = ()=>{
        navigate('/uploadaccessories');
    }
    const navigateSlider = ()=>{
        navigate('/uploadslider');
    }
  return (
    <div>
        <button  onClick={navigateMobile}>
            upload Mobiles
        </button>
        <button  onClick={navigateAcessories}>
            Upload Accesories
        </button>
        <button  onClick={navigateSlider}>
        add slider Image
        </button>
      
    </div>
  )
}

export default Select
