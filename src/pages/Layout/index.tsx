import { Alert, AppBar, Badge, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getItemPrice } from "../../util/getItemPrice";
import menuItems from "../../data/items.json";
import { useState } from "react";
import uuid from "react-uuid";
import { CartList } from "../../components/Cart/CartList";

export const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false);
	const { cartItems, getItemQuantity } = useCart();
	const [orderSubmitted, setOrderSubmitted] = useState(false);
	const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setCartOpen(open);
  };

	const getTotalPrice = () => {
		let total: number = 0;
		cartItems.forEach((item) => {
			const price = menuItems.find(menuItem => menuItem.id === item.itemId)?.price;
			if (price) total = total + (price * getItemQuantity(item.cartId));
		});
		return getItemPrice(total, 1);
	};

	const handleCheckoutButton = () => {
		setOrderSubmitted(true);
		const cart = localStorage.getItem('cart');
		const prevOrders = cart != null ? JSON.parse(cart) : [];

		const orderItems = cartItems.map(item => {
			const { itemId, cartId, quantity } = item;
			const price = menuItems.find(menuItem => menuItem.id === item.itemId)?.price;
			const formattedPrice = price && getItemPrice(price, quantity);
			const name = menuItems.find(menuItem => menuItem.id === item.itemId)?.name;

			return {
				itemId,
				cartId,
				quantity,
				name,
				price: formattedPrice,
			};
		});

		const date = new Date();
		const orderDetails = {
			orderItems,
			total: getTotalPrice(),
			id: uuid(),
			time: date.toLocaleString()
		};

		localStorage.setItem("orders", JSON.stringify([...prevOrders, orderDetails]));
	}

	return (
		<div>
			<AppBar sx={{ alignItems: 'flex-end' }} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
					<div>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => navigate('/orders')}
						>
							Order History
						</Button>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={toggleDrawer(true)}
							color="inherit"
						>
							<Badge badgeContent={cartItems.length} color="error">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
      <Drawer
        anchor={"right"}
        open={cartOpen}
        onClose={toggleDrawer(false)}
      >
				<CartList />
				{ cartItems.length > 0 && (
						<Box
							sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
						>
							<Typography variant="body1" component="div"  align="center" sx={{ m: 2 }}>
								{`Total: ${getTotalPrice()}`}
							</Typography>
							<Button
								variant="contained"
								sx={{ width: '75%' }}
								onClick={() => handleCheckoutButton()}
							>
								Checkout
							</Button>
						</Box>
					)
				}
      </Drawer>
			{ orderSubmitted && <Alert severity="success">Order submitted succesfully!</Alert> }
      <Outlet />
		</div>
	)
}