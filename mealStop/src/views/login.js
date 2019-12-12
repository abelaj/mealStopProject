import React, { useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import Axios from 'axios'
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';


const Login = ({ type }) => {
  let history = useHistory();
  const redirect = to => {
    history.push(`${to}`)
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  if (Cookies.get('api_token')) {
    return <Redirect to="/" />
  }
  const attemptLogin = async (e) => {
    e.preventDefault();
    const response = await Axios.post(`http://localhost:4000/api/auth/login/${type}`, { email, password });
    if (response.data && response.data.api_token) {
      Cookies.set('api_token', response.data.api_token);
      Cookies.set('account_type', type)
      Cookies.set('name', type == 'customer' ? response.data.name.first : response.data.name);
      redirect('/')
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ width: '40vw' }}>
        <center>
          <h1>{type} Login </h1>
          <form onSubmit={attemptLogin}>
            <TextField type="text" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <br />
            <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <br />
            {type == 'customer' && <Link to="/register/customer">Or Register Instead</Link>}
            <br />
            <Button primary type="submit">Login</Button>

          </form>
        </center>

      </Paper>
    </div >
  )
}

export default Login
