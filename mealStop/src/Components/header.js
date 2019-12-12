import React from 'react';
import styles from './header.module.css'
import { useHistory, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Toolbar from '@material-ui/core/Toolbar';
import { fontWeight } from '@material-ui/system';

function Header() {
  const loggedIn = Cookie.get('api_token');
  const accountType = Cookie.get('account_type');
  const name = Cookie.get('name');
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between', color: 'white' }}>
        <Typography variant="h6">
          <Link style={{ color: 'white' }} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} to="/">MealStop</Link>
        </Typography>
        <div className={styles.div2}>
          {!loggedIn && (
            <ButtonGroup>
              <Button to="/login/customer"><Link style={{ color: 'white' }} to="/login/customer">Login Customer</Link></Button>
              <Button ><Link style={{ color: 'white' }} to="/login/restaurant">Login Restaurant</Link></Button>
            </ButtonGroup>)}
          {accountType === 'restaurant' &&
            (<ButtonGroup>
              <Button to="/orders"><Link style={{ color: 'white' }} to="/orders">Orders</Link></Button>
              <Button ><Link style={{ color: 'white' }} to="/restaurant/menu/edit">Edit Menu</Link></Button>
            </ButtonGroup>
            )
          }

          {loggedIn && (
            <ButtonGroup>
              <Button disabled style={{ color: 'white' }} startIcon={<AccountCircle />
              }>
                Welcome {name}
              </Button>
              <Button to="/orders"><Link style={{ color: 'white' }} to="/orders">My Orders</Link></Button>
              <Button to="/logout"><Link style={{ color: 'white' }} to="/logout">Logout</Link></Button>
            </ButtonGroup>)
          }
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
