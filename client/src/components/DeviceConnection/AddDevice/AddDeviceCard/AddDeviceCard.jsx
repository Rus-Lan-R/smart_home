import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddDeviceForm from "./AddDeviceForm/AddDeviceForm";
import * as apiRpiEndPoinst from "../../../../config/apiRpiEndPoinst";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 800,
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

	const { deviceID } = useParams();
	const currentDevice = useSelector((state) => state.scanningIP.find((el) => el.mac === deviceID));

	const [ports, setPort] = useState([]);
	const [currentPort, setCurrentPort] = useState("");
	const [statusConnect, setStatusConnect] = useState(false);

	const connecttoDevice = async (ip, port) => {
		const responseConnect = await fetch(apiRpiEndPoinst.connectDevice(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ip, port }),
		});
		if (responseConnect.ok) {
			setStatusConnect(true);
			setCurrentPort(port);
		}
	};

	useEffect(() => {
		fetch(apiRpiEndPoinst.getPorts(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ip: currentDevice.ip }),
		})
			.then((response) => response.json())
			.then((ports) => setPort(ports));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={classes.root}>
			<Card>
				<CardContent>
					<Typography variant="h5" component="h2">
						{currentDevice.vendor}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{currentDevice.ip}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						{currentDevice.mac}
					</Typography>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Open Ports
					</Typography>
				</CardContent>
				<CardActions>
					{statusConnect ? (
						<Button
							key="{index}"
							variant="outlined"
							// size="small"
							onClick={() => connecttoDevice(currentDevice.ip, currentPort)}
							color="primary"
						>
							Connected to PORT:{currentPort}
						</Button>
					) : (
						ports.map((el, index) => (
							<Button
								key="{index}"
								variant="outlined"
								// size="small"
								onClick={() => connecttoDevice(currentDevice.ip, el)}
								color={statusConnect ? "primary" : "secondary"}
							>
								Connect to PORT:{el}
							</Button>
						))
					)}
					{}
				</CardActions>
			</Card>

			{statusConnect ? (
				<AddDeviceForm vendor={currentDevice.vendor} ip={currentDevice.ip} port={currentPort} />
			) : (
				<div>choose device port</div>
			)}
		</div>
	);
}
