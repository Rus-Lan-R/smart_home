import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useCurrentDeviceIpContext } from "../../../../context/currentDeviceIpContext";
import Container from "@material-ui/core/Container";
import * as apiRpiEndPoinst from "../../../../config/apiRpiEndPoinst";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function AddDeviceCard() {
	const classes = useStyles();

	const [port, setPort] = useState("");

	useEffect(() => {
		fetch(apiRpiEndPoinst.getPorts(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ip: deviceIP.ip }),
		})
			.then((response) => response.json())
			.then((ports) => setPort(ports));
	}, []);

	const { deviceIP, setDeviceIP } = useCurrentDeviceIpContext();

	return (
		<Container width="50%">
			<Card className={classes.root}>
				<CardContent>
					<Typography variant="h5" component="h2">
						{deviceIP.vendor}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{deviceIP.ip}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{deviceIP.mac}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Connect</Button>
				</CardActions>
			</Card>
		</Container>
	);
}
