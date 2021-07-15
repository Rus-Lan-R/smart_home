import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Buttons from '../Buttons/Buttons'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 20
  },
  media: {
    height: 140,
  },
});

const handleClick = async () => {
  await fetch(`http://192.168.1.148:3001/api/rpi/all`)
}

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleClick()}>
        <CardMedia 
          className={classes.media}
          image="https://berserkon.com/images/lamp-transparent-green-2.png"
          title="LED"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            LED
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Change color
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Buttons/>
      </CardActions>
    </Card>
  );
}
