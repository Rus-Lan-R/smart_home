import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Container, MenuItem, Button } from "@material-ui/core";
import { useSelector } from "react-redux";

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

	const handleChange = (event) => {
		setCurrentRoom(event.target.value);
	};

	const handleSubmit = (event) => {
		setCurrentRoom(event.target.value);
		event.preventDefault();
		const payload = Object.fromEntries(new FormData(event.target));
		console.log(payload);
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
								<MenuItem key={el.room} value={el.room}>
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
