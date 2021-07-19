// import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { changeActiveDevice } from "../../redux/actions/devices.action"

// export default function Device({ _id, device, status, picture }) {
//   const [isActive, setActive] = useState(status);
//   // const devices = useSelector((state) => state.devices);
//   // const dispatch = useDispatch();

//   const handleClick = () => {
//     setActive(!isActive);
//     // const deviceCopy = devices.slice();
//     // deviceCopy[id].isActive = !deviceCopy[id].isActive;
//     // dispatch(changeActiveDevice(deviceCopy))
//   };
//   const image = { width: "100%" }

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">{device}</h5>
//         <img src={`/${picture}`} alt={picture} style={image} />
//         <button onClick={handleClick} type="button">
//           {isActive ? "Off" : "On"}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveDevice } from "../../../redux/actions/devices.action";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

export default function Device({ _id, device, status, picture }) {
	const [isActive, setActive] = useState(status);
	// const devices = useSelector((state) => state.devices);
	// const dispatch = useDispatch();

	const handleClick = () => {
		setActive(!isActive);
		// const deviceCopy = devices.slice();
		// deviceCopy[id].isActive = !deviceCopy[id].isActive;
		// dispatch(changeActiveDevice(deviceCopy))
	};
	const classes = useStyles();

	return (
		<Card key={_id} className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={picture} title="Contemplative Reptile" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{device}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
						across all continents except Antarctica
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" onClick={handleClick}>
					{isActive ? "Off" : "On"}
				</Button>
				<Button size="small" color="primary">
					Remove
				</Button>
			</CardActions>
		</Card>
	);
}
