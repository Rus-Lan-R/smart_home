import AddLocationIcon from '@material-ui/icons/AddLocation';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRooms } from "../../redux/actions/rooms.action";
import { getCurrentMarker } from '../../redux/actions/currentMarker.action';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20
  }
}));

export default function MarkerButtons() {
	const rooms = useSelector((state) => state.rooms?.items);
	const dispatch = useDispatch();  
  const classes = useStyles();

	useEffect(() => {
		dispatch(getRooms());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  const handleClick = (el) => {
    dispatch(getCurrentMarker(el));
  };


	return (
		<>
      <ButtonGroup className={classes.root} variant="text"   aria-label="text primary button group">
        {rooms.map((el) => (<Button
                variant="contained"
                // backgroundColor="#4c8de1"
                style={{backgroundColor: "#4c8de1", color: 'light'}}
                className={classes.button}
                startIcon={<AddLocationIcon />}
                size="small"
                onClick={() => handleClick(el)}
              >{el.room}</Button>) )}
      </ButtonGroup>		
		</>
	);
}
