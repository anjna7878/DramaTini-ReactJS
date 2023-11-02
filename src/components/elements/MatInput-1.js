import React from "react";
import TextField from "@material-ui/core/TextField";

const MatInput1 = ({ props, label, name }) => (
  <TextField
    label={label}
    name={name}
    variant="outlined"
    margin="normal"
    color="secondary"
    fullWidth
    {...props}
  />
);

export default MatInput1;
