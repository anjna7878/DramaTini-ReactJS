import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "react-bootstrap";

import { MatButton } from "../../components/elements";
import SHARED_ICONS from "../../themes/shared_icon";


const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export const ProfileForm = props => {
    const classes = useStyles();

    const {
        values: {  first_name, last_name, email, phone, },
        errors,
        touched,
        // handleSubmit,
        handleChange,
        handleBlur,
        isValid,
        // setFieldTouched,
        // dirty, setFieldValue,
        isSubmitting,
        // loading
    } = props;
    // console.table(props);

    return (
        <Form autoComplete="off" id='profile-update-form'>
            <Row>
                <Col md='6' className='fname'>
                    <TextField
                        error={errors.first_name && touched.first_name}
                        label="First Name"
                        name="first_name"
                        variant="outlined"
                        className={classes.textField}
                        helperText={errors.first_name}
                        value={first_name}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaUserCircle}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>
                <Col md='6' className='lname'>
                    <TextField
                        error={errors.last_name && touched.last_name}
                        label="Last Name"
                        name="last_name"
                        variant="outlined"
                        className={classes.textField}
                        helperText={errors.last_name}
                        value={last_name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaUserCircle}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>

                <Col md='6' className='phone'>
                    <TextField
                        error={errors.phone && touched.phone}
                        label="Phone No"
                        name="phone"
                        variant="outlined"
                        type='number'
                        className={classes.textField}
                        helperText={touched.phone ? errors.phone : null}
                        value={phone}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaPhoneAlt}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                    />
                </Col>
                <Col md='6' className='email'>
                    <TextField
                        error={errors.email && touched.email}
                        label="Email Address"
                        name="email"
                        variant="outlined"
                        className={classes.textField}
                        helperText={errors.email}
                        value={email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaEnvelope}
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                        
                    />
                </Col>
            </Row>
            <div className="text-center submit-btn">
                <MatButton
                    type="submit"
                    disableElevation
                    btnText={isSubmitting ? "Please wait" : "Update"}
                    isLoading={isSubmitting}
                    disabled={isSubmitting || !isValid}
                />
            </div>
        </Form>
    );
};














