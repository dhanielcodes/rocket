/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function FormattedDate({ dateString }) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Format the date as a string in a more human-readable format
  const formattedDate = `${date.toLocaleDateString()}`;
//   const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return <span>{formattedDate}</span>;
}

export default FormattedDate;
