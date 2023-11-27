/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { Spin } from '@arco-design/web-react';
import styled from 'styled-components';

const App = ({ style, color }) => {
  return (
    <Cont color={color}>
      <Spin style={style} color={color} />
    </Cont>
  );
};

const Cont = styled.div`
  .arco-spin-icon {
    color: ${(props) => props.color || 'rgba(0, 168, 90, 1)'};
    text-align: center;
    width: 100%;
  }
`;

export default App;
