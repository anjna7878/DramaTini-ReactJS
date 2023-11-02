import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import icons from "../../themes/icons";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },

}));

function UserAvatar({ imgUrl, ...props }) {
  const classes = useStyles();

  return (
    <>

      <Avatar
        {...props}
        sizes="22"
        src={imgUrl ? imgUrl : icons.Avatar}
        className={`${classes.small} ${props.className}`}
      />
    </>
  );
}

export default UserAvatar;






