
import React, { useState } from "react";
import {  Row, Col } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import {  Form, Formik } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import queryString from 'query-string'
import {  NotificationManager } from 'react-notifications';

import SHARED_ICONS from "../../themes/shared_icon";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import { MatButton } from "../../components/elements";
import { _authServices } from "../../services/api";
import LOGOS from "../../themes/logo";


const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));


const validationSchema = Yup.object().shape({
    new_password: Yup.string()
        .label("Password")
        .required("Required*")
        .min(6, "Password must have at least 6 characters ")
        .max(24, "Try a shorter password."),
    confirm_password: Yup.string()
        .label("Password")
        .required("Required*")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        // .when("password", {
        //   is: password => (password && password.length > 0 ? true : false),
        //   then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
        // })
        .min(6, "Password must have at least 6 characters ")
        .max(24, "Try a shorter password."),
});


function ResetPassword() {
    const classes = useStyles();
    const location = useLocation();
    const [token, setToken] = useState('');
    const [user_id, setUserId] = useState('');
    const history = useHistory();

    const initialValues = { new_password: '',confirm_password: ''};

    const [showPassword, changeShowHidePassword] = useState(false);
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    React.useEffect(() => getPassedData(), [])

    const getPassedData = async () => {
        const values = queryString.parse(location.search)
        if (!!values.token && !!values.user) {
            setToken(values.token)
            setUserId(values.user)
        } else {
            history.push('/')
        }
    };

    const submitForm = (values, actions) => {
        _authServices.resetPassword(token, user_id, values,).then(
            res => {
                actions.setSubmitting(false);
                if (res['status'] === 1) {
                    NotificationManager.success('Password changed successfully', 'Success',);
                    history.push('/')
                } else if (res['status'] === 0) {
                    NotificationManager.error('Invalid credentials or token expired','Failed');
                    // Object.keys(res['error']).forEach(function (key) {
                    //     NotificationManager.error(res['error'][key]['message']);
                    // })
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
            <Layout sectionId="ResetPasswordSection">
                <NavBar />
                <div id="reset-password-parent-box">
                    <Row>
                        <Col md='5' className='social-login'>
                            <img src={LOGOS.site_logo} alt="Logo" className="app-logo" />
                        </Col>
                        <Col md='7' className='normal-login'>
                            <h6 className='or'><span>Reset Password</span></h6>
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
                                        values: { new_password, confirm_password },
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
                                                        error={errors.new_password && touched.new_password}
                                                        label="Password"
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
                                                        btnText={isSubmitting ? "Please wait" : "Reset Password"}
                                                        isLoading={isSubmitting}
                                                        disabled={isSubmitting || !(dirty && isValid)}
                                                    />
                                                </div>
                                            </Form>
                                        </>
                                    );
                                }}
                            </Formik>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </>
    );
}

export default ResetPassword;
