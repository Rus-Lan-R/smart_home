import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDevices } from "../../../redux/actions/devices.action";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { deviceChangeStatus } from "../../../redux/actions/devices.action";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

export default function DevicesList() {
	const devices = useSelector((state) => state.devices.items);

	console.log("state  -->> ", devices);

	const { roomName } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDevices(roomName));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomName]);

	const handleClick = (id, status) => {
		dispatch(deviceChangeStatus({ id, status }));
	};
	const classes = useStyles();

	return (
		<Grid container direction="row" justifyContent="space-around" alignItems="center">
			{devices.map((el) => (
				<Card key={el._id} className={classes.root}>
					<CardActionArea>
						<CardMedia className={classes.media} image={el.picture} title="Contemplative Reptile" />
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{el.device}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Lizards are a widespread group of squamate reptiles, with over 6,000 species,
								ranging across all continents except Antarctica
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary" onClick={() => handleClick(el._id, el.status)}>
							{el.status ? "Off" : "On"}
						</Button>
						<Button size="small" color="primary">
							Remove
						</Button>
					</CardActions>
				</Card>
			))}
		</Grid>
	);
}
