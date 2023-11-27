/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */




import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSessionStorage } from './useSessionStorage';

const Index = ({ component: Component, ...rest }) => {
  let isAuthorized = false;
  const {getSessionStorage} = useSessionStorage("__appUser")
  const token = getSessionStorage;
  console.log(token)
  if (token !== undefined || null ) {
    isAuthorized = true;
  }
  return isAuthorized ? <Outlet /> : <Navigate to='/' />;
};

export default Index;