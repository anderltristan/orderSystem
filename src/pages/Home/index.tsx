import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import items from "../../data/items.json";
import { useCart } from "../../context/CartContext";

export const Home = () => {
	const [menuData, setMenuData] = useState<any[]>([]);
	const { increaseItemQuantity } = useCart();

	useEffect(() => {
		setMenuData([...items]);
	}, []);

	return (
		<div>
			<Container maxWidth="lg">
				<Typography variant="h2" component="div"  align="center">
					Menu
				</Typography>
				<Grid container spacing={3}>
					{menuData.map(
						(item) =>
							(
								<Grid key={item.id} item xs={12} sm={4} lg={4}>
									<Card sx={{ maxWidth: 345, minHeight: 375, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
										<CardActionArea>
											<CardMedia
												component="img"
												height="140"
												image={item.imageUrl}
												alt={item.name}
											/>
											<CardContent>
												<Typography gutterBottom variant="h5" component="div">
													{item.name}
												</Typography>
												<Typography variant="body2" color="text.secondary">
													{item.description}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<Button
												size="small"
												color="primary"
												variant="contained"
												onClick={() => increaseItemQuantity(item.id)}
											>
												Add to cart
											</Button>
										</CardActions>
									</Card>
								</Grid>
							)
					)}
				</Grid>
			</Container>
		</div>
	)
}