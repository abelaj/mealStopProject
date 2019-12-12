import React, { useState } from 'react';
import gql from 'graphql-tag';
import Cookies from 'js-cookie';
import { useQuery, useMutation } from 'react-apollo-hooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
const placeOrder = async (placeOrderMutation, cart, setCart, api_token) => {

  let newCart = cart.map(item => {
    delete item.__typename;
    return item;
  })
  await placeOrderMutation({ variables: { contents: newCart, api_token } })
  setCart([])
}
const MenuItem = ({ name, description, price, onClick }) => {
  return (
    <ListItem button onClick={() => onClick()} >
      <ListItemAvatar>
        <Avatar>
          ${price}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={description} />
    </ListItem>
  )

}

const Cart = ({ cart, removeItem }) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return (
    <List >
      {cart.map((foodItem, index) => <MenuItem key={foodItem.name} name={foodItem.name} description={foodItem.description} price={foodItem.price} onClick={() => removeItem(index)} />)}
      <h2>Total: ${total} </h2>
    </List>
  )
}

const removeFromCart = (cart, index) => {
  let tempCart = [...cart]
  tempCart.splice(index, 1);
  return tempCart;
}
const Menu = ({ }) => {
  const api_token = Cookies.get('api_token')
  const [cart, setCart] = useState([])
  const [canPlaceOrder, setCanPlaceOrder] = useState(true)
  const GET_MENU = gql`
    query getMenu($api_token: String){
        getMenu(api_token: $api_token){
        name
      description
      price
    }
  }
`;

  const PLACE_ORDER = gql`
  mutation PlaceOrder($api_token:String, $contents:[FoodItemInput]){
  placeOrder(api_token: $api_token, contents: $contents){
    status
  }
}
`
  const [placeOrderMutation, { }] = useMutation(PLACE_ORDER);

  const { data = [], error, loading } = useQuery(GET_MENU, { variables: { api_token } });
  if (loading) {
    return <h1>Loading</h1>
  }

  const removeItem = (index) => {
    setCart(removeFromCart(cart, index));
  }
  const addItem = (foodItem) => {
    let tempCart = [...cart];
    tempCart.push(foodItem);
    setCart(tempCart)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ width: '60%' }}>
        <h1>Menu</h1>
        <List >

          {
            data.getMenu.map(foodItem =>
              <MenuItem key={foodItem.name} name={foodItem.name} description={foodItem.description} price={foodItem.price} onClick={() => addItem(foodItem)} />
            )
          }
        </List>
      </div>
      <div>
        <h1>Cart</h1>
        <Cart cart={cart} removeItem={removeItem} />
        {cart.length && <button disabled={!canPlaceOrder} onClick={e => placeOrder(placeOrderMutation, cart, setCart, api_token)}> {canPlaceOrder ? 'Place Order' : 'Placing Order'}</button>}
      </div>

    </div>

  )
}

export default Menu
