import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as devicesEndPoinst from "../../../../../config/devicesEndPoints";
import { IconPicker } from "react-fa-icon-picker";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		paddingTop: "20px",
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: "25ch",
	},
}));

const typesSensors = [
	{ _id: 1001, type: "Temperature" },
	{ _id: 1002, type: "Pressure" },
	{ _id: 1003, type: "Humidity" },
	{ _id: 1004, type: "Motion Sensor" },
];

const typeDevice = [
	{ _id: 1001, type: "Device" },
	{ _id: 1002, type: "Sensor" },
];
const deviceSpecific = [
	{ _id: 1001, type: "Lamp" },
	{ _id: 1002, type: "Heater" },
	{ _id: 1003, type: "Socket" },
	{ _id: 1004, type: "LED Strip" },
	{ _id: 1005, type: "Boiler" },
	{ _id: 1006, type: "Fun" },
];
export default function AddDeviceForm({ vendor, ip, port }) {
	const roomsList = useSelector((state) => state.rooms.items);
	const [value, setValue] = useState("");
	const classes = useStyles();

	const [currentRoom, setCurrentRoom] = useState("");
	const [currentRoomID, setCurrentRoomID] = useState("");
	const [currentTypeDevice, setCurrentTypeDevice] = useState("");
	const [currentTypeSensor, setCurrentTypeSensor] = useState("");
	const [currentDeviceSpecific, setCurrentDeviceSpecific] = useState("");
	const [deviceAddStatus, setDeviceAddStatus] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const body = Object.fromEntries(new FormData(event.target));

		if (currentTypeDevice === "Sensor") {
			const responseAddDevice = await fetch(devicesEndPoinst.userSensors(), {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...body,
					room: currentRoomID,
					currentTypeSensor,
					ip,
					port,
					picture: value,
				}),
			});
			if (responseAddDevice.ok) {
				setDeviceAddStatus(true);
			}
		} else {
			const responseAddDevice = await fetch(devicesEndPoinst.userDevices(), {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...body,
					room: currentRoomID,
					ip,
					port,
					deviceSpecific: currentDeviceSpecific,
				}),
			});
			if (responseAddDevice.ok) {
				setDeviceAddStatus(true);
			}
		}
	};

	if (deviceAddStatus) {
		setTimeout(() => {
			setDeviceAddStatus(false);
		}, 2000);
	}

	return (
		<div className={classes.root}>
			<form className={classes.root} onSubmit={handleSubmit}>
				<div>
					<IconPicker value={value} onChange={(v) => setValue(v)} />
					<TextField
						id="standard-select-currency"
						name="room"
						select
						label="Select"
						value={currentTypeDevice}
						onChange={(event) => setCurrentTypeDevice(event.target.value)}
						className={clsx(classes.margin, classes.textField)}
						helperText="Please select device type"
						required
					>
						{typeDevice.map((el) => (
							<MenuItem key={el._id} value={el.type} onClick={() => setCurrentTypeDevice(el.type)}>
								{el.type}
							</MenuItem>
						))}
					</TextField>

					{currentTypeDevice === "Sensor" ? (
						<TextField
							id="standard-select-currency"
							name="room"
							select
							label="Select"
							value={currentTypeSensor}
							onChange={(event) => setCurrentTypeSensor(event.target.value)}
							className={clsx(classes.margin, classes.textField)}
							helperText="Please select sensor"
							required
						>
							{typesSensors.map((el) => (
								<MenuItem
									key={el._id}
									value={el.type}
									onClick={() => setCurrentTypeSensor(el.type)}
								>
									{el.type}
								</MenuItem>
							))}
						</TextField>
					) : (
						<TextField
							id="standard-select-currency"
							name="room"
							select
							label="Select"
							value={currentDeviceSpecific}
							onChange={(event) => setCurrentDeviceSpecific(event.target.value)}
							className={clsx(classes.margin, classes.textField)}
							helperText="Please select device"
							required
						>
							{deviceSpecific.map((el) => (
								<MenuItem
									key={el._id}
									value={el.type}
									onClick={() => setCurrentTypeSensor(el.type)}
								>
									{el.type}
								</MenuItem>
							))}
						</TextField>
					)}

					<TextField
						id="standard-basic"
						label="Device name"
						name="device"
						className={clsx(classes.margin, classes.textField)}
						required
					/>

					<TextField
						id="standard-select-currency"
						name="room"
						select
						label="Select"
						value={currentRoom}
						onChange={(event) => setCurrentRoom(event.target.value)}
						className={clsx(classes.margin, classes.textField)}
						helperText="Please select room"
						required
					>
						{roomsList.map((el) => (
							<MenuItem key={el._id} value={el.room} onClick={() => setCurrentRoomID(el._id)}>
								{el.room}
							</MenuItem>
						))}
					</TextField>
				</div>
				<Button
					type="submit"
					variant="outlined"
					color="primary"
					className={clsx(classes.margin, classes.textField)}
				>
					Add
				</Button>
			</form>
			{deviceAddStatus ? (
				<Typography variant="h5" component="h2">
					{currentTypeDevice === "Sensor" ? "Sensor " : "Device "}added ✅
				</Typography>
			) : (
				<></>
			)}
		</div>
	);
}
