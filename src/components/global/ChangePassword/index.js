
import React, { useState } from "react";


import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {  NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";

import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";

import { MatButton } from "../../elements";
import { _authServices } from "../../../services/api";
import SHARED_ICONS from "../../../themes/shared_icon";

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required*"),
  new_password: Yup.string()
    .required("Required*")
    .min(6, "Password must have at least 6 characters ")
    .max(24, "Try a shorter password."),
  confirm_password: Yup.string()
    .required("Required*")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")

});


function ChangePassword(props) {
  const currentUser = useSelector(state => state.user);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showPassword, changeShowHidePassword] = useState(false);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };


  function handleClose() { setOpen(false); }
  function clickMe(event) {setOpen(true); }


  const initialValues = {
    password: '',
    new_password: '',
    confirm_password: ''
  };


  
  const submitForm = (values, actions) => {
    _authServices.changePassword(currentUser?.user, values).then(
      res => {
        actions.setSubmitting(false);
        if (res['status'] === 1) {
          NotificationManager.success('Password changed successfully', 'Success',);
          setOpen(false);
        } else if (res['status'] === 0) {
          Object.keys(res['error']).forEach(function (key) {
            NotificationManager.error(res['error'][key]['message']);
          })
        } else {
          NotificationManager.error('Something went wrong, try again later.');
        }
      },
      error => {
        actions.setSubmitting(false);
        NotificationManager.error('Something went wrong, try again later.');
      }
    );
  };


  return (
    <>
      <p className='change-password' onClick={(e) => { clickMe(e) }}>Change your password</p>

      <Dialog open={open} onClose={handleClose} id='change-password-pop-up' fullWidth={true} maxWidth='sm' aria-labelledby="form-dialog-title">
        <DialogContent className='body-content'>
          <IconButton aria-label="close" onClick={handleClose} className='close-btn'>
            <CloseIcon/>
          </IconButton>
          <h6 className='__text__'><span>Change password</span></h6>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              submitForm(values, actions);
            }}
          >
            {(formik) => {
              const {
                values: { password, new_password, confirm_password },
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                isSubmitting,
                dirty
              } = formik;
              return (
                <>

                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-row">
                      <TextField
                        error={errors.password && touched.password}
                        label="Old Password"
                        type="password"
                        name="password"
                        id="password"
                        variant="outlined"
                        className={classes.textField}
                        helperText={errors.password}
                        value={password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {SHARED_ICONS?.RiLockPasswordFill}
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                      />
                    </div>
                    <div className="form-row">
                      <TextField
                        error={errors.new_password && touched.new_password}
                        label="New Password"
                        name="new_password"
                        variant="outlined"
                        className={classes.textField}
                        type={showPassword ? "text" : "password"}
                        value={new_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                        helperText={errors.new_password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {SHARED_ICONS?.RiLockPasswordFill}
                            </InputAdornment>
                          ),

                          endAdornment: (
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
                          )
                        }}
                      />
                    </div>
                    <div className="form-row">
                      <TextField
                        error={errors.confirm_password && touched.confirm_password}
                        label="Confirm Password"
                        name="confirm_password"
                        variant="outlined"
                        className={classes.textField}
                        type={showPassword ? "text" : "password"}
                        value={confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                        helperText={errors.confirm_password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {SHARED_ICONS?.RiLockPasswordFill}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="text-center submit-btn">
                      <MatButton
                        type="submit"
                        disableElevation
                        btnText={isSubmitting ? "Please wait" : "Update Password"}
                        isLoading={isSubmitting}
                        disabled={isSubmitting || !(dirty && isValid)}
                      />
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ChangePassword;

