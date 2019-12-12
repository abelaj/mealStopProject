import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import Cookies from 'js-cookie'
const Order = ({ order, accountType, api_token, updateOrderStatus }) => {
  let total = 0;
  for (let i = 0; i < order.contents.length; i++) {
    total += order.contents[i].price
  }
  return (
    <TableRow>
      <TableCell>{order.contents.map(item => <div>{item.name}</div>)}</TableCell>
      <TableCell>${total}</TableCell>
      <TableCell>{order._id}</TableCell>
      <TableCell>{accountType !== 'restaurant' ? order.status : (
        <Select
          onChange={e => updateOrderStatus({
            variables: { api_token, order_id: order._id, new_status: e.target.value }, refetchQueries: ["GET_ORDERS"],
          })}
          value={order.status.toLowerCase()}>
          <MenuItem value={'placed'}>Placed</MenuItem>
          <MenuItem value={'received'}>Received</MenuItem>
          <MenuItem value={'delivered'}>Delivered</MenuItem>
        </Select>


      )


      }</TableCell>
      {accountType == 'restaurant' && <TableCell>
        <Button onClick={() => {
          const links=['https://goo.gl/maps/Ar1pZemVJoqhR2Sz9', 'https://goo.gl/maps/WdLKmcon9dVaP5pQ8', 'https://goo.gl/maps/DUwTc4P96U9qPU4y6', 'https://goo.gl/maps/op2oZWjm1BCNqNSU8' ]
          const win = window.open(links[Math.floor(Math.random() * links.length)], '_blank');
          win.focus();
        }}>Navigate To</Button>
      </TableCell>}
    </TableRow>
  )
}
const OrdersView = ({ }) => {
  const accountType = Cookies.get('account_type');
  const api_token = Cookies.get('api_token');

  const GET_ORDERS = gql`
  query getOrders{

  getOrders(api_token: "d829894a8f67be93") {
    _id
    customer {
      name{
        first
        last
      }
    }
    contents {
      name
      description
      price
    }
    status

  }
}
`;

  const UPDATE_ORDERSTATUS = gql`
mutation UpdateOrderStatus($api_token: String, $order_id: String, $new_status: String){
  updateOrderStatus(api_token: $api_token, order_id: $order_id, new_status: $new_status){
    status
  }
}
`
  const [updateOrderStatus] = useMutation(UPDATE_ORDERSTATUS);
  const { data = [], error, loading } = useQuery(GET_ORDERS);
  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <Paper>
      <h1> Orders Page</h1>
      <Table>
        <TableHead>
          <TableCell>
            Items In order
      </TableCell>
          <TableCell>
            Price
      </TableCell>
          <TableCell>
            Order id
      </TableCell>
          <TableCell>
            Order Status
      </TableCell>
          {accountType == 'restaurant' && <TableCell>
            Directions
      </TableCell>}
        </TableHead>

        <TableBody>
          {data.getOrders.map(order => <Order accountType={accountType} key={order._id} order={order} updateOrderStatus={updateOrderStatus} api_token={api_token} />)}
        </TableBody>

      </Table>
    </Paper>
  )
}

export default OrdersView;
