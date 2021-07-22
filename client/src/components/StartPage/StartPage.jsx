import React from "react";
import backgroundH from "../../img/smart-home-icon.gif";
import devicesIcons from "../../img/devices_icon.png";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

function StartPage() {
	const classes = useStyles();
	return (
		<div
			style={{
				backgroundImage: "url(" + backgroundH + ")",
				backgroundSize: "auto",

				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundColor: "#dbe2e0",

				height: "93vh",
			}}
		>
			<Grid container xs spacing={3}>
				<Grid item xs={3}>
					<img src={devicesIcons} alt="pictures devices" />
				</Grid>
				<Grid item xs>
					<Paper className={classes.paper}>xs=6 sm=3</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>xs=6 sm=3</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

// height: "94vh",

export default StartPage;
