import {  styled } from 'styled-components'
import React, { useState } from 'react';
import { Grid, Divider, Card } from '@arco-design/web-react';
import { IconClockCircle, IconCheck, IconExclamationCircleFill } from '@arco-design/web-react/icon';
import { Switch, Timeline, Typography } from '@arco-design/web-react';
const TimelineItem = Timeline.Item;
const Row = Grid.Row;
const Col = Grid.Col;

function ExchangeRates() {
    const [reverse, setReverse] = useState(false);

  return (
      <Exchange>
        <Card
        hoverable
        style={{ width: 360, marginBottom: 20 }}
      >
    <h1>hi</h1>
      </Card>
      <Card
        className='card-with-icon-hover'
        hoverable
        style={{ width: 360 }}
      >
       <h1>hi</h1>
      </Card>
     <div style={{ width: '100%' }}>
      
   
      <Timeline labelPosition="same" style={{display:'none'}} >
        <TimelineItem >The first milestone</TimelineItem>
        <TimelineItem style={{margin:0}} label='2020-09-30' labelPosition='relative'>The third milestone</TimelineItem>
     
      </Timeline>
 
    </div>

      
    </Exchange>
  )
}

const Exchange = styled.div `
color:#B7B7B7 ;
    width: 400px;
height: 20rem;
flex-shrink: 0;
padding: 20px;
border-radius: 20px;
border: 1px solid rgba(255, 255, 255, 0.30);
background: linear-gradient(139deg, rgba(255, 255, 255, 0.12) 2.35%, rgba(255, 255, 255, 0.18) 100%);
backdrop-filter: blur(10px);


`



export default ExchangeRates