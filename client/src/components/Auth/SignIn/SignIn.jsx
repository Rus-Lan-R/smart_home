import {
	Container,
	Paper,
	Grid,
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/actions/user.action";

import { makeStyles } from "@material-ui/core/styles";
import { Fingerprint } from "@material-ui/icons";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

const useStyles = makeStyles({
	root: {
		marginTop: "15%",
	},
});

const SignIn = () => {
	const classes = useStyles();

	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = Object.fromEntries(new FormData(e.target));
		dispatch(signIn(payload, history, from));
	};
	return (
		<Container maxWidth="sm" className={classes.root}>
			<form onSubmit={handleSubmit}>
				<Paper component="span" m={10} container spacing={4}>
					<div container>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item>
								<AlternateEmailIcon />
							</Grid>
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									id="userEmail"
									label="Email"
									name="userEmail"
									type="email"
									fullWidth
									autoFocus
									required
								/>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems="flex-end">
							<Grid item>
								<Fingerprint />
							</Grid>
							<Grid item md={true} sm={true} xs={true}>
								<TextField
									id="userPassword"
									label="Password"
									name="userPassword"
									type="password"
									fullWidth
									required
								/>
							</Grid>
						</Grid>
						<Grid container style={{ margin: "20px" }} alignItems="center" justify="space-between">
							<Grid item>
								<FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
							</Grid>
							<Grid item>
								<Button
									disableFocusRipple
									disableRipple
									style={{ textTransform: "none" }}
									variant="text"
									color="primary"
								>
									Forgot password ?
								</Button>
							</Grid>
						</Grid>
						<Grid container justify="center" style={{ marginTop: "10px" }}>
							<Button
								type="submit"
								variant="outlined"
								color="primary"
								style={{ textTransform: "none", width: "50%" }}
							>
								Login
							</Button>
						</Grid>
					</div>
				</Paper>
			</form>
		</Container>
	);
};

export default SignIn;
