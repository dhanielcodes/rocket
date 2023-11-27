import React from 'react'
import styled from 'styled-components';

 const TextInput = ({label,inputfocus, placehlder}) => {
  return (
    <TextInputBox>
            <label htmlFor="html">{label}</label>
            <input type="text" name="" id={inputfocus} placehlde={placehlder} />
    </TextInputBox>
  )
}

export default TextInput;

const TextInputBox = styled.div`
width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 5px;
    label{
        color: #344054;
        font-size: 14px;
        font-weight: 400;
        // line-height: 20px;
    }
    input{
        height: 35px;
        width: 100%;
        border: 2px solid red;
        background: #fff;
        border-radius: 8px;
        border: 1px solid #D0D5DD;
        background: #FFF;
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    }
`;
