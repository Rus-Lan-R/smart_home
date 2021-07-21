import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: "lg",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "url(https://d1icd6shlvmxi6.cloudfront.net/gsc/5AY79P/9f/d4/59/9fd459e0fab74bd6a44674d5a5146f15/images/homecontainer/u99.png?token=d8e3ec4504c7324592f7fb307565462d6d3ba1fed012d74505d896b2b11bd51e)",
    width: 700,
    height: 450,
    marginTop: 50,
    backgroundSize: 'contain',
    // position: 'absolute'  
  },
}));



export default function SimpleContainer() {
  const [marker, setMarkers] = useState([]);
  const classes = useStyles();

  const handleClick = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    let screenX = e.screenX;
    let screenY = e.screenY;
    let pageX = e.pageX;
    let pageY = e.pageY;
    let offX = e.offsetLeft;
    let offY = e.offsetTop;
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    const event_offsetX = e.clientX - (currentTargetRect.left+340),
          event_offsetY = e.clientY - currentTargetRect.top;
          console.log(currentTargetRect.left, currentTargetRect.top);
    console.log("client",clientX,clientY);
    console.log("screen",screenX,screenY);
    console.log("page",pageX,pageY);
    console.log('container',  offX,offY );
    console.log(e);
    const styleMarker = {position: 'relative', color: 'red', left: `${event_offsetX}px`, top: `${event_offsetY}px`, width: 0,
    height: 0,}
    setMarkers([...marker, <div style={styleMarker}>Привет</div>])
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <Container onClick={(e) => handleClick(e)} className={classes.root} >
        {marker}
      </Container>  
    </React.Fragment>
  );
}
