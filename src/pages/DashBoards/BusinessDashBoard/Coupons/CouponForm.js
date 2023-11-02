import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {  Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col,   } from "react-bootstrap";

import { MatButton } from "../../../../components/elements";
import { FaGift } from "react-icons/fa";


const useStyles = makeStyles(theme => ({

    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export const CouponForm = props => {
    const classes = useStyles();

    const {
        values: { coupon_code, coupon_percentage, },
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


    return (
        <Form autoComplete="off" id='coupon-create-form'>
            <Row>
                <Col md='12' className='coupon-code'>
                    <TextField
                        error={errors.coupon_code && touched.coupon_code}
                        label="Coupon Code"
                        name="coupon_code"
                        variant="standard"
                        className={classes.textField}
                        helperText={errors.coupon_code}
                        value={coupon_code}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaGift />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>
                <Col md='12' className='coupon-discount'>
                    <TextField
                        error={errors.coupon_percentage && touched.coupon_percentage}
                        label="Coupon %"
                        name="coupon_percentage"
                        variant="standard"
                        type="number"
                        className={classes.textField}
                        helperText={errors.coupon_percentage}
                        value={coupon_percentage}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaGift />
                                </InputAdornment>
                            ),
                        }}
                        placeholder={'[0 - 99]'}
                        inputProps={{ min: 0, max: 99 }}
                        onInput={(e)=>{ 
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
                        }}
                        min={0}
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
                    btnText={isSubmitting ? "Please wait" : "Create"}
                    isLoading={isSubmitting}
                    disabled={isSubmitting || !isValid}
                />
            </div>
        </Form>
    );
};

