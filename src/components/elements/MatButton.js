import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  spinner: {
    color: "#ffffff",
    marginLeft: theme.spacing(1)
  }
}));

function MatButton({
  name,
  className,
  btnText,
  isLoading,
  endIcon,
  startIcon,
  disabled = false,
  ...props
}) {
  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        className={classes.button, className}
        endIcon={isLoading ? null : endIcon}
        startIcon={isLoading ? null : startIcon}
        {...props}
      >
        {btnText}
        {isLoading ? (
          <CircularProgress
            size={16}
            className={classes.spinner}
            thickness={5}
          />
        ) : null}
      </Button>
    </>
  );
}


export default MatButton;