import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from "../Card/Card"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: "lg",
    flexDirection: "row",
    // backgroundColor: theme.palette.background.paper,
    
  },
  imageList: {
    width: 500,
    height: 450,
    marginTop: 50
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function SimpleContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root} >
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
        <Card />
      </Container>
    </React.Fragment>
  );
}
