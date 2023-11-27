/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import AmountFormatter from './AmountFormatter'

export default function Total({text,amount,currency,other}) {
  return (
    <TotalCont>
      
        <div className='text'>
            <p>{text || 'Total amount you’ll be paying'}</p>
              {
                other ? (<h2>{  <AmountFormatter currency={other} value={amount}/>}</h2>) : (<h2>{  <AmountFormatter currency={currency}  value={amount}/>}</h2>)
              }
            
        </div>
    </TotalCont>
  )
}


const TotalCont = styled.div`
    background-color: #fff;
    padding: 1em;
    border-radius: 10px;

    .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 1em;
    }
   

`