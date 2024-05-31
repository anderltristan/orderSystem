import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import items from "../../../data/items.json";
import { getItemPrice } from "../../../util/getItemPrice";

export const CartItem = ({
	cartId,
	itemId,
}: {
	cartId: string;
	itemId: string;	
}) => {
	const {
		getItemQuantity,
		increaseItemQuantity,
		decreaseItemQuantity,
	} = useCart();

	const item = items.find(item => item.id === itemId);
	const itemQuantity = getItemQuantity(cartId);

	return (
		<ListItem
			key={cartId}
			disablePadding
			sx={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}
		>
			<Box>
				<ListItemText primary={`${item?.name} (${getItemQuantity(cartId)})` || ""} />
				<IconButton
					aria-label="delete"
					color="primary"
					onClick={() => increaseItemQuantity(cartId)}
				>
					<Add />
				</IconButton>
				<IconButton
					aria-label="delete"
					color="primary"
					onClick={() => decreaseItemQuantity(cartId)}
				>
					<Remove />
				</IconButton>
			</Box>
			<Box>
				<ListItemText primary={item?.price ? getItemPrice(itemQuantity, item.price) : 0} />
			</Box>
		</ListItem>
	)
}

export const CartList = () => {
	const { cartItems } = useCart();
	
	return (
		<List sx={{ width: 350, m: 2 }} >
			{cartItems.length > 0 ? cartItems.map((item, index) => (
				<CartItem
					cartId={item.cartId}
					itemId={item.itemId}
				/>
			)) : (
				<Box>
					<Typography variant="body1" component="div"  align="center">
						No items added to cart.
					</Typography>
				</Box>
			)}
		</List>
	)
}