import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRooms } from "../../../redux/actions/rooms.action";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import AddItemsButton from "../AddItemsButton/AddItemsButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
  },
  AddItemsButton : {
    "& .MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3" : {
      margin: 100,
    }
  }
}));

export default function LeftMenuRoomsList() {
	const rooms = useSelector((state) => state.rooms?.items);
	const dispatch = useDispatch();  

	useEffect(() => {
		dispatch(getRooms());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  
  const classes = useStyles();
	return (
		<>
			{rooms.map((el) => (
				<Paper className={classes.root}  key={el._id}>
					<MenuList>
						<MenuItem>
							<ListItemIcon>
								<SendIcon fontSize="small" />
							</ListItemIcon>
							<Typography variant="inherit">
								<Link style={{ color: "inherit" }} to={`/home/rooms/${el._id}`}>
									{el.room}
								</Link>
							</Typography>
						</MenuItem>
					</MenuList>
				</Paper>
			))}
			<AddItemsButton className={classes.AddItemsButton} text="Add Room" link="/home/addRoom" />
			<AddItemsButton className={classes.AddItemsButton} text="Add Device" link="/home/config" />
		</>
	);
}
