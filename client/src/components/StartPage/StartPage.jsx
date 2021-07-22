import React from "react";
import backgroundH from "../../img/smart-home-icon.gif";
import devicesIcons from "../../img/devices_icon.png";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import SignIn from "../Auth/SignIn/SignIn";

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
			<Grid container xs spacing={3} justifyContent="space-around">
				<Grid item xs={4} alignItems="center"></Grid>
				<Grid item xs>
					<div>SMART HOME</div>
					<div>OPERATING SYSTEM YOUR HOME</div>
				</Grid>
				<Grid container item xs={4} direction="column" justifyContent="flex-end">
					<Grid>
						<SignIn />
					</Grid>
				</Grid>
			</Grid>

			{/* <div > */}
			<Grid
				style={{ position: "fixed", left: 0, bottom: 0, width: "100%" }}
				container
				xs
				spacing={3}
				justifyContent="space-around"
				padding="20px"
			>
				<Grid item xs={4} alignItems="center"></Grid>
				<Grid justifyContent="center" item xs>
					<div style={{ align: "center" }}>
						<p>Normalno delay - Normlno bydet</p>
					</div>
				</Grid>
				<Grid item xs={2} direction="row" alignItems="flex-end"></Grid>
				<Grid item xs={2} direction="row" alignItems="flex-end">
					<img width="100%" src={devicesIcons} alt="pictures devices" />
				</Grid>
			</Grid>
			{/* </div> */}

			{/* <div style={{ width: "100%", position: "fixed", bottom: 0, right: 0 }}>
				<img width="20%" src={devicesIcons} alt="pictures devices" />
			</div> */}
		</div>
	);
}

// height: "94vh",

export default StartPage;
