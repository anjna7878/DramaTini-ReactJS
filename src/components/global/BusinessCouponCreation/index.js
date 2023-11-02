
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";

import { MatButton } from "../../elements";
import SHARED_ICONS from "../../../themes/shared_icon";
import { _restServices } from "../../../services/api";
import _VALIDATE from '../../../helpers/YupValidationSchema';


const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const validationSchema = Yup.object().shape({
  coupon_code: _VALIDATE?.coupon_code,
  coupon_percentage: _VALIDATE?.coupon_percentage
});



function BusinessCouponCreation(props) {
  const currentUser = useSelector(state => state.user);
  const classes = useStyles();
  const [initialValues, setValues] = React.useState({ coupon_code: '', coupon_percentage: '' });

  const createCoupon = (values, actions) => {
    console.log(values);
    _restServices.createCoupon(currentUser?.user?.token, values).then(
      res => {
        actions.setSubmitting(false);
        console.log(res);
        if (res['status'] === 1) {
          NotificationManager.success('Success', 'Coupon created successfully');
          setValues({ coupon_code: '', coupon_percentage: '' })
          props.parentCallback(false);
          props.parentCallback2();
        } else if (res['status'] === 0) {
          Object.keys(res['error']).forEach(function (key) {
            NotificationManager.error(res['error'][key]['message']);
          })
        } else {
          NotificationManager.error('Something went wrong, try again later.');
        }
      }
    );
  };


  
  return (
    <>
      <Dialog open={props?.formShow} id='business-new-coupon-pop-up' fullWidth={true} maxWidth='sm' aria-labelledby="form-dialog-title">
        <DialogContent className='body-content'>
          <IconButton aria-label="close" onClick={props.onClick} className='close-btn'>
            <CloseIcon />
          </IconButton>
          <h6 className='__text__'><span>New Coupon</span></h6>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              createCoupon(values, actions);
            }}
          >
            {(formik) => {
              const {
                values: { coupon_code, coupon_percentage },
                handleChange,
                // handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                isSubmitting,
                // dirty
              } = formik;
              return (
                <>
                  <Form autoComplete="off" id='coupon-create-form'>
                    <div className='coupon-code'>
                      <TextField
                        error={errors.coupon_code && touched.coupon_code}
                        label="Coupon Code"
                        name="coupon_code"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.coupon_code) ? errors.coupon_code : null}
                        value={coupon_code}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {SHARED_ICONS?.FaGift}
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                      />
                    </div>
                    <div className='coupon-discount'>
                      <TextField
                        error={errors.coupon_percentage && touched.coupon_percentage}
                        label="Coupon discount %"
                        name="coupon_percentage"
                        variant="outlined"
                        type="number"
                        className={classes.textField}
                        helperText={(touched.coupon_percentage) ? errors.coupon_percentage : null}
                        value={coupon_percentage}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {SHARED_ICONS?.FaGift}
                            </InputAdornment>
                          ),
                        }}
                        placeholder={'[0 - 99]'}
                        inputProps={{ min: 0, max: 99 }}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                        }}
                        min={0}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                      />
                    </div>


                    <div className="text-center submit-btn">
                      <MatButton
                        type="button"
                        className='cancel'
                        disableElevation
                        btnText={"Cancel"}
                        onClick={props.onClick}
                      />
                      <MatButton
                        type="submit"
                        disableElevation
                        btnText={isSubmitting ? "Please wait" : "Create"}
                        isLoading={isSubmitting}
                        disabled={isSubmitting || !isValid}
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
export default BusinessCouponCreation;

