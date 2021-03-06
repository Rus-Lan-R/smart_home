import React from "react";
import { Link } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconPickerItem } from 'react-fa-icon-picker'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
    // maxWidth: 270,
    // height: 68
  },
}));

export default function AddItemsButton({ text, link }) {
  const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<MenuList>
						<Link style={{ textDecoration: 'none', color: "inherit" }} to={`${link}`}>
				<MenuItem>
        <IconPickerItem icon="FaRegPlusSquare" size={24} color="#000"/>
					<Typography style={{marginLeft: 15}} variant="inherit">
							{text}
					</Typography>
				</MenuItem>
						</Link>
			</MenuList>
		</Paper>
	);
}
