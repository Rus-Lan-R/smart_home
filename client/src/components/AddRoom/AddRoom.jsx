import useInput from "../../hooks/inputHooks";
import { useDispatch } from "react-redux";
import { addRoom } from "../../redux/actions/rooms.action";
import * as React from 'react'
import { IconPicker } from 'react-fa-icon-picker'
import { useState } from 'react';
import {Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function AddRoom() {
  const classes = useStyles();

	const input = useInput({ placeholder: "Toilet", type: "text" });
  const [value, setValue] = useState("")

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const responseAddRoom = await fetch(`${process.env.REACT_APP_API_URL}/api/room`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
        picture: value,
				room: input.getValue(),
			}),
		});
		const newRoom = await responseAddRoom.json();

		dispatch(addRoom(newRoom));
		input.clear();
	};

	return (
    <div style={{padding: '15px', width: "50%"}}>
    <Card className={classes.root}  >
		<form  className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h6" component="div">
       Create new Room
			</Typography>
      <Typography variant="subtitle1" component="div">
        Choose icon: 			
      </Typography>
      <IconPicker value={value} onChange={(v) => setValue(v)} />
      <TextField id="outlined-basic" label="Еnter room's name" variant="outlined" {...input.tagAttrs} />
       <div> 
      <Button type="submit" variant="contained" color="secondary">
        Create
      </Button>
     </div>
		</form>
    </Card>
    </div>
	);
}
