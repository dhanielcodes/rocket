/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

const CustomInput = ({ readonly, style,placeholder,onChange,val ,className}) => {
  // Define a default style with border-radius
  const defaultStyle = {
    borderRadius: '10px',
    padding: '13px',
    border: '1px solid #ccc',
    color:"#000",
    background:"none",
    width:"100%"
    // Add other default styles here
  };

  // Merge the default style with the style prop if provided
  const inputStyle = { ...defaultStyle, ...style };

  return (
    <input
      style={inputStyle}
      readOnly={readonly}
     placeholder={placeholder}
     onChange={onChange}
     value={val}
     className={className}
    />
  );
};

export default CustomInput;
