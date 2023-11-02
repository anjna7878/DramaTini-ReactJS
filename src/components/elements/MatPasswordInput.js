import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { SHARED_ICONS } from "../../themes";




const MatPasswordInput = ({ label, name, isPassword = true, hidePasswordIcon = false, startIcon, endIcon, ...props }) => {
  const [showPassword, changeShowHidePassword] = React.useState(false);
  const handleMouseDownPassword = event => { event.preventDefault() };

  return (
    <TextField
      label={label}
      name={name}
      variant="outlined"
      margin="normal"
      autoComplete="off"
      fullWidth
      type={(showPassword || !isPassword) ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {SHARED_ICONS?.RiLockPasswordFill}
          </InputAdornment>
        ),
        endAdornment: (
          (!hidePasswordIcon) ?
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => changeShowHidePassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? SHARED_ICONS?.Visibility : SHARED_ICONS?.VisibilityOff}
              </IconButton>
            </InputAdornment>
            : null
        )

      }}
      {...props}
    />
  )
}





  ;

export default MatPasswordInput;
