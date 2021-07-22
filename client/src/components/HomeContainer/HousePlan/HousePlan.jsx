import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentMarker } from '../../../redux/actions/currentMarker.action';
import MarkerButtons from '../../Buttons/MarkerButtons';
import { changeStatusOfRoomMarker } from '../../../redux/actions/rooms.action';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: "lg",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "url(https://d1icd6shlvmxi6.cloudfront.net/gsc/5AY79P/9f/d4/59/9fd459e0fab74bd6a44674d5a5146f15/images/homecontainer/u99.png?token=8e7f4a44a908645dcadacbf7a11f13f6b1db9d76141d7c9a9937f61e4c61552f)",
    width: 700,
    height: 450,
    marginTop: 20,
    backgroundSize: 'contain',
    marginBottom: 20 ,
  },
}));



export default function SimpleContainer() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const currentMarker = useSelector((state) => state.currentMarker);
  const rooms = useSelector((state) => state.rooms);


  const handleClick = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX = e.clientX - (currentTargetRect.left+340),
          event_offsetY = e.clientY - currentTargetRect.top;
    let roomMarker = [...rooms.items].find((el) => el._id === currentMarker.item._id);
    const styleMarker = {position: 'relative', color: 'red', left: `${event_offsetX}px`, top: `${event_offsetY}px`, width: 0,
    height: 0, visibility: 'visible'};
    dispatch(changeStatusOfRoomMarker({...roomMarker,...styleMarker}))
    dispatch(clearCurrentMarker())
  };

  const handleDblCLick = (e, id) => {
    let roomMarker = [...rooms.items].find((el) => el._id === id);
    const styleMarker = {visibility: 'hidden'};
    dispatch(changeStatusOfRoomMarker({...roomMarker,...styleMarker}))
  };


  return (
    <>
    <React.Fragment>
      <CssBaseline />
        <MarkerButtons/>
      <Container onClick={(e) => handleClick(e)} className={classes.root} >
        {rooms.items.map((item) => {
          const styleMarker = {position: item.position, color: item.color, left: item.left, top: item.top, width: 0,
          height: 0, visibility: item.visibility};
        return <div key={item._id} style={styleMarker} onDoubleClick={(e) => handleDblCLick(e, item._id)} >{item.room}</div>})
        }
      </Container>  
    </React.Fragment>
    </>
  );
}
