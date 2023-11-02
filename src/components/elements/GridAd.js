import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";



import LocationString from "../global/LocationString"

const useStyles = makeStyles(theme => ({
  card: {
    position: "relative"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));


export const GridAd = props =>  {
  const classes = useStyles();

  return (
    <div className="ads-grid">
      <Card className={classes.card}>
        <div className="card-btn-group">
          <Fab variant="extended" size="small">
            <NavigationIcon className={classes.extendedIcon} />
            10.3 km
          </Fab>

          <Fab size="small" aria-label="like" color="secondary">
            <ShareIcon />
          </Fab>
          <Fab size="small" aria-label="like" color="secondary">
            <FavoriteIcon />
          </Fab>
        </div>

        <CardMedia
          className={classes.media}
          image={props.data.picture.large}
          title={props.data.email}
        />
        <CardContent>
          <h3>
            {props.data.name.title +
              " " +
              props.data.name.first +
              " " +
              props.data.name.last}
          </h3>
          <LocationString data={props.data.location}/>
         
        </CardContent>
      </Card>
    </div>
  );
}


