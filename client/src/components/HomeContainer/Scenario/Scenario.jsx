import { Paper, Button } from "@material-ui/core";
import { useState } from "react";
import { selectScenario } from "../../../redux/actions/scenarios.action";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
	image: {
		width: "100%",
	},
}));

export default function Scenario({ item }) {
	const classes = useStyles();
	const [isActive, setIsActive] = useState(false);
	const dispatch = useDispatch();

	const handleClick = (nameScenario, isActive) => {
		dispatch(selectScenario({ nameScenario, isActive }));
		setIsActive(!isActive);
	};

	return (
		<Paper style={{ height: "100%", borderRadius: "10px", margin: "0 10px" }}>
			{/* <img src={`/${item.picture}`} alt={item.picture} /> */}
			<img className={classes.image} src={`/${item.picture}`} alt={item.picture} />
			<Typography variant="h5" component="div">
				<div style={{ padding: "10px", color: "#ff8e56" }}>"{item.name}"</div>
			</Typography>
			<Button className="CheckButton" onClick={() => handleClick(item.name, isActive)}>
				{isActive ? "Stop" : "Start"}
				{/* <div>{isActive? <Typography variant="subtitle1" component="div" style={{color: "lightgreen"}}>Started</Typography> : ""}</div> */}
			</Button>
		</Paper>
	);
}
