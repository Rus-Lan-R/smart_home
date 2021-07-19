// import { useSelector } from "react-redux";

// import Header from "../DefaultContainer/Header/Header";
// import LeftMenu from "../DefaultContainer/LeftMenu/LeftMenu";

// export default function DefaultContainer() {
// 	const user = useSelector((state) => state.user);

// 	return (
// 		<>

// 			<Header />

// 			{user ? <LeftMenu /> : <></>}
// 		</>
// 	);
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useSelector } from "react-redux";

import Header from "../DefaultContainer/Header/Header";
import LeftMenuRoomsList from "../DefaultContainer/LeftMenu/LeftMenuRoomsList/LeftMenuRoomsList";
import BodyRouter from "../BodyRouter/BodyRouter";

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

export default function AutoGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item xs>
					<Header />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs>
					<LeftMenuRoomsList />
				</Grid>
				<Grid item xs={9}>
					<BodyRouter />
				</Grid>
			</Grid>
		</div>
	);
}
