import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Container, MenuItem, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as devicesEndPoinst from "../../../../../config/devicesEndPoints";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
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

export default function AddDeviceForm({ vendor, ip, port }) {
	const roomsList = useSelector((state) => state.rooms.items);

	const classes = useStyles();

	const [currentRoom, setCurrentRoom] = useState("");
	const [currentRoomID, setCurrentRoomID] = useState("");

	const handleChange = (event) => {
		setCurrentRoom(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const body = Object.fromEntries(new FormData(event.target));

		const responseAddDevice = await fetch(devicesEndPoinst.userDevices(), {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...body, room: currentRoomID, ip, port }),
		});
		if (responseAddDevice.ok) {
			console.log("device added");
		}
		// dispatch();
	};

	return (
		<Container width="75%">
			<div className={classes.root}>
				<form className={classes.root} onSubmit={handleSubmit}>
					<div>
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
							onChange={handleChange}
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
			</div>
		</Container>
	);
}