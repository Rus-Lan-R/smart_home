import React from "react";
import backgroundH from "../../img/smart-home-icon.gif";
import devicesIcons from "../../img/devices_icon.png";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import SignIn from "../Auth/SignIn/SignIn";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
  mainTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#619bd9c7',
    paddingTop: '40px'
  },
  button: {
    background: "#2d8de2",
    color: '#fff',
    padding: '1rem 1.5rem', 
    textDecoration: 'none',
    // border: "3px solid #fff"
  }
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

				height: "calc(100vh - 64px)",
			}}
		>
			<Grid container xs justifyContent="space-around">
				{/* <Grid item xs={4} alignItems="center">
						<SignIn />          
        </Grid>
				 */}

				<Grid justifyContent="center" item xs className={classes.mainTitle}>
					<h1 style={{ align: "center" }}>
          <span>SMART HOME</span><br/>
					<span>OPERATING SYSTEM YOUR HOME</span>
					</h1>
          <Link className={classes.button} to="/home" >SMART YOUR LIFE</Link>
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
				<Grid justifyContent="center" item xs className={classes.mainTitle}>
					<div style={{ align: "center" , color: "#619bd9c7"}}>
						<p>Normalno delay - Normalno bydet</p>
					</div>
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
