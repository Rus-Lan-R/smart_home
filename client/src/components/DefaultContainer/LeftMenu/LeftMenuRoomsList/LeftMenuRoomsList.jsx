import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDevices } from "../../../../redux/actions/devices.action";
import { getRooms } from "../../../../redux/actions/rooms.action";

import MenuList from "@material-ui/core/MenuList";
// import Link from "@material-ui/core/Link";

import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";

export default function LeftMenuRoomsList() {
	const rooms = useSelector((state) => state.rooms?.items);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRooms());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{rooms.map((el) => (
				<Paper style={{ margin: "10px" }} key={el._id}>
					<MenuList>
						<MenuItem>
							<ListItemIcon>
								<SendIcon fontSize="small" />
							</ListItemIcon>
							<Typography variant="inherit">
								<Link to={`/rooms/${el.room}`} onClick={() => dispatch(getDevices(el._id))}>
									{el.room}
								</Link>
							</Typography>
						</MenuItem>
					</MenuList>
				</Paper>
			))}
		</>
	);
}
