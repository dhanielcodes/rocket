/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Select from 'react-select';

const customStyles = {
    // Define styles for the dropdown list
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#FFF' : 'white',
      color:state.isSelected ? '#000' :'#000000',
      padding:"8px",
      ':hover': {
        borderColor: state.isSelected ? 'grey' : 'rgba(233, 237, 245, 1)', // Border color on hover
      },
       // Change background color based on selection
    }),
    
  };

const CustomSelect = ({ options, isMulti, value, onChange, styles,placeholder,defaultValue }) => {

    
  return (
    <Select
      isMulti={isMulti}
      value={value}
      onChange={onChange}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default CustomSelect;
