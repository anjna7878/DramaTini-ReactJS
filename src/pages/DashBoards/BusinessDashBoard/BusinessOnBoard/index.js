import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import { Formik } from "formik";

import { OnBoardForm } from "./OnBoardForm";
import { _restServices } from "../../../../services/api";
import { authConstants } from "../../../../store/_constants";
import BusinessDashBoardPage from "../Business";

import _VALIDATE from '../../../../helpers/YupValidationSchema';




const validationSchema = Yup.object().shape({

    business_name: _VALIDATE?.name,
    business_address: _VALIDATE?.address,
    business_city: _VALIDATE?.city,
    business_state: _VALIDATE?.state,
    business_zip: _VALIDATE?.zip,

    business_map_location: _VALIDATE?.map_location,
    business_map_place_id: _VALIDATE?.map_place_id,
    business_map_long: _VALIDATE?.map_long,
    business_map_lat: _VALIDATE?.map_lat,

    business_opening_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)'),
    business_closing_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)')
        .min(Yup.ref('business_opening_time'), "End time can't be before Start time"),

    // business_opening_time: Yup.date('invalid time').required("Required*").nullable(),
    // business_closing_time: Yup.date('invalid time').required("Required*").nullable(),

    business_description: _VALIDATE?.business_description,
    business_phone: _VALIDATE?.phone,
    business_email: _VALIDATE?.email,
    business_website: _VALIDATE?.website,

    business_img_file: _VALIDATE?.business_img_file,
    image_file_name: _VALIDATE?.image_file_name,

    coupon_selected: _VALIDATE?.coupon_selected,
    qr_code: _VALIDATE?.qr_code,


});


function BusinessOnBoard({ history }) {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();


    const initialValues = {
        business_name: '',
        business_address: '',
        business_city: '',
        business_state: '',
        business_zip: '',

        business_map_location: '',
        business_map_place_id: '',
        business_map_long: '',
        business_map_lat: '',

        business_phone: '',
        business_description: '',
        business_email: '',
        business_website: '',

        business_opening_time: null,
        business_closing_time: null,

        coupon_selected: '',

        business_img_file: '',
        image_file_name: '',

    };


    const startOnBoardingBusiness = (values, actions) => {
        console.log('VAL:', values);

        const formData = new FormData();
        formData.append('business_name', values.business_name)
        formData.append('address', values.business_address)
        formData.append('city', values.business_city)
        formData.append('state', values.business_state)
        formData.append('zip', values.business_zip)

        formData.append('formatted_address', values.business_map_location)
        formData.append('latitude', values.business_map_lat)
        formData.append('longitude', values.business_map_long)
        formData.append('place_id', values.business_map_place_id)
        formData.append('business_opening_time', values.business_opening_time)
        formData.append('business_closing_time', values.business_closing_time)

        formData.append('website_url', values.business_website)
        formData.append('contact_info', values.business_phone)
        formData.append('business_desc', values.business_description)
        formData.append('phone', values.business_phone)
        formData.append('email', values.business_email)
        formData.append('coupon_id', values.coupon_selected)
        formData.append('image', values.business_img_file)

        console.log('formData', formData);

        _restServices.createBusiness(currentUser?.user?.token, formData).then(
            res => {
                console.log(res);
                actions.setSubmitting(false);

                if (res['status'] === 1) {
                    var userData = { ...currentUser?.user, ...res?.data, }
                    dispatch({ type: authConstants.USER_LOGIN_SUCCESS, userData });
                    NotificationManager.success('Success', 'Business created successfully');
                } else if (res['status'] === 0) {
                    Object.keys(res['error']).forEach(function (key) {
                        NotificationManager.error(res['error'][key]['message'], 'Field Missing');
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
            {currentUser?.user?.business ? (
                <>
                    <BusinessDashBoardPage />
                </>) : (
                <>
                    <div id="business-onboard-section-parent">
                        <h6 className='__text__'><span>Business Onboarding</span></h6>
                        <Formik
                            validateOnChange
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                startOnBoardingBusiness(values, actions);
                            }}
                        >
                            {props => <OnBoardForm {...props} user={currentUser} />}
                        </Formik>
                    </div>
                </>
            )}
        </>
    )
}
export default BusinessOnBoard;


