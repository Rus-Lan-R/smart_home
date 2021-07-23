import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
import { IconPickerItem } from "react-fa-icon-picker";

const useStyles = makeStyles({
	root: {
		maxWidth: 250,
		marginTop: 30,
		maxHeight: 200,
	},
	media: {
		height: 100,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function DevicesList() {
	const devices = useSelector((state) => state.devices.items);
	const sensors = useSelector((state) => state.sensors.items);

	const { roomName } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDevices(roomName));
		dispatch(getSensors(roomName));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomName]);

	useEffect(() => {
		let interval = setInterval(() => {
			dispatch(getDevices(roomName));
			dispatch(getSensors(roomName));
		}, 2500);
		return () => {
			clearInterval(interval);
		};
	});

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
		<Grid container spacing={1} direction="row" alignItems="top">
			<Grid container item xs={6} spacing={1} direction="row" alignItems="top">
				{devices.map((el) => (
					<Grid item xs={4}>
						<Card key={el._id} className={classes.root}>
							<CardActionArea>
								<CardContent direction="column">
									<IconPickerItem icon={`${el.picture}`} size={24} color="#000" />
									<Typography gutterBottom variant="h5" component="h2">
										{el.device}
									</Typography>
									<Typography variant="h7" className={classes.pos} color="textSecondary">
										Expendet Power - {el.expendedPower} Wt
									</Typography>
									<Typography variant="h7" className={classes.pos} color="textSecondary">
										Time Working - {+(el.timeWorking / 3600).toFixed(4)} h
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
					</Grid>
				))}
			</Grid>
			<Grid container item xs={6} spacing={1} direction="row" alignItems="top">
				{sensors.map((el) => (
					<Grid item xs={5}>
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
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}
