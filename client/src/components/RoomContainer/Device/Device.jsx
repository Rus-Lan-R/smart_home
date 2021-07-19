import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deviceChangeStatus } from "../../../redux/actions/devices.action";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		marginTop: 20,
	},
	media: {
		height: 140,
	},
});

export default function Device({ _id, device, picture, apiURL }) {
	const dispatch = useDispatch();
	const currentDevice = useSelector((state) => state.devices.items.find((el) => el._id === _id));

	const handleClick = (id, status) => {
		dispatch(deviceChangeStatus({ id, status, apiURL }));
	};
	const classes = useStyles();

	console.log("state device", currentDevice);

	return (
		<Card key={_id} className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={currentDevice.picture}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{currentDevice.device}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
						across all continents except Antarctica
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					size="small"
					color="primary"
					onClick={() => handleClick(currentDevice._id, currentDevice.status)}
				>
					{currentDevice.status ? "Off" : "On"}
				</Button>
				<Button size="small" color="primary">
					Remove
				</Button>
			</CardActions>
		</Card>
	);
}
