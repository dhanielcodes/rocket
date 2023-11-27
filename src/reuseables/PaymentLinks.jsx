import React from 'react';

const Iframe = ({ src, title, width, height }) => {
  return <iframe src={src} title={title} width={width} height={height} frameBorder="0" />;
};

export default Iframe;
