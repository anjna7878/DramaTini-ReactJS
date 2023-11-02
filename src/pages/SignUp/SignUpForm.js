import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { Form } from "formik";
// import { makeStyles } from "@material-ui/core/styles";
// import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Row, Col } from "react-bootstrap";


import { MatButton, MatInput, MatPasswordInput } from "../../components/elements";
import { SHARED_ICONS } from "../../themes";


// const useStyles = makeStyles(theme => ({
//     textField: {
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(1)
//     }
// }));


export const SignUpForm = props => {
    // const classes = useStyles();
    const {
        values: { first_name, last_name, email, password, confirm_password, agreeTerms },
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        // handleSubmit, setFieldTouched, dirty,setSubmitting, loading
    } = props;
    // console.table(props);

    const [showPassword, changeShowHidePassword] = useState(false);

    // const handleMouseDownPassword = event => {
    //     event.preventDefault();
    // };

 

    return (
        <Form autoComplete="off" id='sign-up-form'>
            <Row>
                <Col md='6' className='fname'>
                    <MatInput
                        error={errors.first_name && touched.first_name}
                        label="First Name"
                        name="first_name"
                        helperText={(touched.first_name) ? errors.first_name : null}
                        value={first_name}
                        startIcon={SHARED_ICONS?.FaUserCircle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Col>
                <Col md='6' className='lname'>
                    <MatInput
                        error={errors.last_name && touched.last_name}
                        label="Last Name"
                        name="last_name"
                        helperText={(touched.last_name) ? errors.last_name : null}
                        value={last_name}
                        startIcon={SHARED_ICONS?.FaUserCircle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                </Col>
            </Row>
            <Row>
                <Col md='6' className='password'>
                    <MatPasswordInput
                        error={errors.password && touched.password}
                        label="Password"
                        name="password"
                        helperText={(touched.password) ? errors.password : null}
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Col>

                <Col md='6' className='cpassword'>
                    <MatPasswordInput
                        error={errors.confirm_password && touched.confirm_password}
                        label="Confirm Password"
                        name="confirm_password"
                        helperText={(touched.confirm_password) ? errors.confirm_password : null}
                        value={confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isPassword={showPassword}
                        hidePasswordIcon={true}
                    />
                </Col>

                <Col md='12' className='email'>
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
                </Col>
            </Row>

            <div className='terms-n-conditions-parent'>
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
                        label="I accept the Terms of Use & Privacy Policy."
                        className="custom-checkbox"
                    />
                </FormControl>
            </div>


            <div className="text-center sign-up-btn">
                <MatButton
                    type="submit"
                    disableElevation
                    btnText={props.user.isProcessing ? "Please wait" : "Sign Up"}
                    isLoading={props.user.isProcessing}
                    disabled={props.user.isProcessing || !isValid}
                />

            </div>
        </Form>
    );
};














