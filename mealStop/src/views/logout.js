import React from 'react';
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie';
const Logout = ({ }) => {
  Cookies.remove('api_token');
  Cookies.remove('account_type');
  Cookies.remove('name');
  return <Redirect to="/" />
}

export default Logout;
