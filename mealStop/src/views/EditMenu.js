import React, { useState } from 'react';
import Cookies from 'js-cookie'
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const EditMenu = ({ }) => {
  const ADD_FOODITEM = gql`
  mutation AddFoodItem($api_token: String!, $name: String!, $description: String!, $registered: Int!, $vip: Int!, $visitor: Int!) {
  addFoodItem (api_token: $api_token ,
    name: $name,
  description:$description,
  price:{
    registered:$registered,
    vip:$vip,
    visitor:$visitor
  }) {
    name
    description
  }
  }
  `
  const api_token = Cookies.get('api_token')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [visitor, setVisitor] = useState(0)
  const [vip, setVip] = useState(0)
  const [registered, setRegistered] = useState(0)
  const [canSubmit, setCanSubmit] = useState(true);
  const [addFoodItem, { data }] = useMutation(ADD_FOODITEM);

  const addToMenu = async (e) => {
    e.preventDefault();
    setCanSubmit(false);
    await addFoodItem({ variables: { api_token, name, description, visitor: parseInt(visitor, 10), vip: parseInt(vip, 10), registered: parseInt(registered, 10) } });
    setCanSubmit(true);


  }
  return (
    <div>
      <h1>Welcome Cook!</h1>
      <h3>Edit menu:</h3>
      <div>
        {canSubmit ?
          <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={addToMenu}>
            <TextField label="Name" type="text" label="Menu Item Name" value={name} onChange={e => setName(e.target.value)} />

            <TextField type="text" label="Menu Item Description" value={description} onChange={e => setDescription(e.target.value)} />

            <TextField type="number" label="Menu Item visitor price" value={visitor} onChange={e => setVisitor(e.target.value)} />

            <TextField type="number" label="Menu Item vip price" value={vip} onChange={e => setVip(e.target.value)} />

            <TextField type="number" label="Menu Item registered price" value={registered} onChange={e => setRegistered(e.target.value)} />
            <Button type="submit" disabled={!name.length || !description.length}>Add Menu Item</Button>
          </form> :
          <h1>Loading...</h1>
        }
      </div>
    </div>
  )
}

export default EditMenu;
