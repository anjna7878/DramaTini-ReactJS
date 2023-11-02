import React from "react";

import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(0)
    }
  },
  alertStyle: {
    justifyContent: "center",
    padding: "3px 8px",
    borderRadius: 0,
    fontSize: 14
  }
}));

function AlertMessage({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <div className="custom-mui-alert-message">
        <div className={classes.root}>
          <Collapse in={open}>
            {data && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                variant="filled"
                severity="error"
                className={classes.alertStyle}
              >
                {data.msg}
              </Alert>
            )}
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default AlertMessage;
