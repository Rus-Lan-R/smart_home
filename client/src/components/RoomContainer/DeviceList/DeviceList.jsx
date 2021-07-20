import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDevices } from "../../../redux/actions/devices.action";
import {
	getSensors,
	resetMotionSensor,
	sensorsChangeStatus,
} from "../../../redux/actions/sensors.action";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import { deviceChangeStatus } from "../../../redux/actions/devices.action";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		maxWidth: 200,
		marginTop: 20,
	},
	media: {
		height: 140,
	},
});

export default function DevicesList() {
	const devices = useSelector((state) => state.devices.items);
	const sensors = useSelector((state) => state.sensors.items);

	console.log("state  -->> ", devices);

	const { roomName } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDevices(roomName));
		dispatch(getSensors(roomName));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomName]);

	const handleClickDevice = (id, status) => {
		dispatch(deviceChangeStatus({ id, status }));
	};
	const handleClickSensor = (id, status) => {
		dispatch(sensorsChangeStatus({ id, status }));
	};

	const resetAlarm = (sensorID) => {
		dispatch(resetMotionSensor(sensorID));
	};

	const classes = useStyles();
	// justifyContent="space-around"
	return (
		<Grid container spacing={3} direction="row" alignItems="center">
			<Grid item xs>
				{devices.map((el) => (
					<Card key={el._id} className={classes.root}>
						<CardActionArea>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									{el.device}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								size="small"
								color="primary"
								onClick={() => handleClickDevice(el._id, el.status)}
							>
								{el.status ? "Off" : "On"}
							</Button>
							<Button size="small" color="primary">
								Remove
							</Button>
						</CardActions>
					</Card>
				))}
			</Grid>

			<Grid item xs>
				{sensors.map((el) => (
					<Card key={el._id} className={classes.root}>
						<CardActionArea>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									{el.sensorName}
								</Typography>
								<Typography gutterBottom variant="h9" component="h4">
									{el.sensorType} - {el.status ? "ON" : "OFF"}
								</Typography>
								<Typography variant="h2" component="p">
									{el.value}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button
								size="small"
								color="primary"
								onClick={() => handleClickSensor(el._id, el.status)}
							>
								{el.status ? "Off" : "On"}
							</Button>
							{el.sensorType === "Motion Sensor" ? (
								<Button size="small" color="primary" onClick={() => resetAlarm(el._id)}>
									Reset
								</Button>
							) : (
								<></>
							)}
							<Button size="small" color="primary">
								Remove
							</Button>
						</CardActions>
					</Card>
				))}
			</Grid>
		</Grid>
	);
}
