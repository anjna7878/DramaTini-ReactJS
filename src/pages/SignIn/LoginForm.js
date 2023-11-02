import React, { useState } from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';

import SHARED_ICONS from "../../themes/shared_icon";
import { _authServices } from "../../services/api";
import { MatButton, MatInput, MatPasswordInput } from "../../components/elements";
import _VALIDATE from '../../helpers/YupValidationSchema';




const validationSchemaForForgot = Yup.object().shape({
    email: _VALIDATE?.registered_email
});



export const LoginForm = props => {
    const {
        values: { email, password, agreeTerms },
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        // handleSubmit, setFieldTouched, dirty,setSubmitting, loading
    } = props;
    // console.table(props);


    

    const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    function openForgotPasswordPopUp(event) { setForgotPasswordOpen(true); }
    function handleClose() { setForgotPasswordOpen(false); }

    const initialValues = { email: '' };

    const submitForm = (values, actions) => {
        console.log('values', values);
        _authServices.sendPasswordResetLink(values).then(
            res => {
                actions.setSubmitting(false);
                if (res['status'] === 1) {
                    NotificationManager.success('Reset link sent to your registered email', 'Success',);
                    setForgotPasswordOpen(false);
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
            <Form autoComplete="off">
                <MatInput
                    error={errors.email && touched.email}
                    label="Email Address"
                    name='email'
                    helperText={(touched.email) ? errors.email : null}
                    value={email}
                    startIcon={SHARED_ICONS?.AiOutlineMail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <MatPasswordInput
                    error={errors.password && touched.password}
                    label="Password"
                    name="password"
                    helperText={(touched.password) ? errors.password : null}
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <div className='forgot-password-parent'>
                    <FormControl
                        error={errors.agreeTerms && touched.agreeTerms}
                        className="terms-n-conditions"
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="agreeTerms"
                                    label="agreeTerms"
                                    checked={agreeTerms}
                                    onChange={handleChange}
                                />
                            }
                            label="Remember me"
                            className="custom-checkbox"
                        />
                    </FormControl>
                    <p onClick={(e) => { openForgotPasswordPopUp(e) }}>Forgot password?</p>
                </div>


                <div className="text-center login-btn">
                    <MatButton
                        type="submit"
                        disableElevation
                        btnText={props.user.isProcessing ? "Signing In" : "Sign In"}
                        isLoading={props.user.isProcessing}
                        disabled={props.user.isProcessing || !isValid}
                    />
                    {/* <h6>You are signing in with <span>Tini Membership</span></h6> */}
                </div>
            </Form>


            <Dialog open={isForgotPasswordOpen} onClose={handleClose} id='forgot-password-pop-up' fullWidth={true} maxWidth='sm' aria-labelledby="form-dialog-title">
                <DialogContent className='body-content'>
                    <IconButton aria-label="close" onClick={handleClose} className='close-btn'>
                        {SHARED_ICONS?.CloseIcon}
                    </IconButton>
                    <h6 className='__text__'><span>Reset password</span></h6>
                    <p className='reset-info'>Please provide the registered email address and we will send you reset link shortly on your email.
                    kindly follow instructions mentioned on email.
                    </p>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchemaForForgot}
                        onSubmit={(values, actions) => {
                            submitForm(values, actions);
                        }}
                    >
                        {(formik) => {
                            const {
                                values: { email },
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

                                            <MatInput
                                                error={errors.email && touched.email}
                                                label="Email Address"
                                                name='email'
                                                helperText={(touched.email) ? errors.email : null}
                                                value={email}
                                                startIcon={SHARED_ICONS?.AiOutlineMail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>

                                        <div className="text-center submit-btn">
                                            <MatButton
                                                type="submit"
                                                disableElevation
                                                btnText={isSubmitting ? "Please wait" : "Submit"}
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
    );
};














