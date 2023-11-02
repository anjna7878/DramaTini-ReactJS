import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";


const MatInput = ({ label, name, startIcon, endIcon, ...props }) => (
  <TextField
    label={label}
    name={name}
    variant="outlined"
    margin="normal"
    autoComplete="off"
    fullWidth

    InputProps={{
      startAdornment: (
        (startIcon) ?
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
          : null
      ),
    }}
    {...props}
  />
);

export default MatInput;
