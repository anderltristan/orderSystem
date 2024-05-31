import { Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ICartItem, useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";

export type IOrder = {
  orderItems?: ICartItem[],
  total: string,
  id: string;
  time?: string;
}

export const OrderHistory = () => {
  const { cartItems } = useCart();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const items = localStorage.getItem("orders");
    items && setOrders([...JSON.parse(items)]);
  }, [cartItems]);

  return (
    <Container>
      <Typography variant="h2" component="div"  align="center">
					Order History
			</Typography>
      <List sx={{ m: 2 }} >
        {
          orders.map(order => (
            <ListItem
              divider
              key={order.id}
              disablePadding
              sx={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", m: 5}}
            >
              <Typography variant="h5" component="div" align="center">
                  Order placed on {order.time}
              </Typography>
              <List sx={{ m: 2 }} >
                {
                  order.orderItems && order.orderItems.map(item => (
                    <ListItem>
                      <ListItemText primary={`${item.name} (${item.quantity})` || ""} />
                      <ListItemText primary={`${item.price}` || ""} />
                    </ListItem>
                  ))
                }
                <ListItem>
                  Total: {order.total}
                </ListItem>
              </List>
            </ListItem>
          ))
        }
      </List>
    </Container>
  )
}