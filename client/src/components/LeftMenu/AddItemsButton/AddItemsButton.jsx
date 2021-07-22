import React from "react";
import { Link } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
    maxWidth: 200
  },
}));

export default function AddItemsButton({ text, link }) {
  const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<MenuList>
				<MenuItem>
					<ListItemIcon>
						<AddCircleIcon />
					</ListItemIcon>
					<Typography variant="inherit">
						<Link style={{ color: "inherit" }} to={`${link}`}>
							{text}
						</Link>
					</Typography>
				</MenuItem>
			</MenuList>
		</Paper>
	);
}
