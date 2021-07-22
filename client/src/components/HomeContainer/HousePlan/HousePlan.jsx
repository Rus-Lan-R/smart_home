import React, { useEffect } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentMarker } from '../../../redux/actions/currentMarker.action';
import MarkerButtons from '../../Buttons/MarkerButtons';
import { changeStatusOfRoomMarker } from '../../../redux/actions/rooms.action';
import { getAllDevices } from "../../../redux/actions/allDevices.action";
import backgroundPlan from "../../../img/u99.png";
import { IconPickerItem } from 'react-fa-icon-picker';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: "lg",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "url(" + backgroundPlan + ")",
    width: 900,
    height: 600,
    marginTop: 20,
    backgroundSize: 'contain',
    marginBottom: 20 ,
  },
}));



export default function SimpleContainer() {
  useEffect(() => {
    dispatch(getAllDevices())
  }, []);
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const currentMarker = useSelector((state) => state.currentMarker);
  const rooms = useSelector((state) => state.rooms);
  const sensors = useSelector((state) => state.allDevices?.items);
  

  const handleClick = (e) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    console.log(currentTargetRect);
    const event_offsetX = e.clientX - (currentTargetRect.left+(currentTargetRect.width/2)),
          event_offsetY = e.clientY - currentTargetRect.top;
    let roomMarker = [...rooms.items].find((el) => el._id === currentMarker.item._id);
    const styleMarker = {position: 'relative', color: 'yellow', left: `${event_offsetX}px`, top: `${event_offsetY}px`, width:0,
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
          height: 0, visibility: item.visibility, zIndex: Math.floor(Math.random() * 101)};
        return <div key={item._id} style={styleMarker} onDoubleClick={(e) => handleDblCLick(e, item._id)}>{item.room}<IconPickerItem icon={`${item.picture}`} size={36} color="yellow"/>
        {/* {sensors.items.map((el) => )} */}
        </div>})
        }
      </Container>  
    </React.Fragment>
    </>
  );
}
