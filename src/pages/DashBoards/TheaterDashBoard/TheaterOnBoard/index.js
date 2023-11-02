import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { OnBoardForm } from "./OnBoardForm";
import { NotificationManager } from 'react-notifications';

import TheaterDashBoard from "../Theater";
import { _restServices } from "../../../../services/api";
import { authConstants } from "../../../../store/_constants";

import _VALIDATE from '../../../../helpers/YupValidationSchema';




const validationSchema = Yup.object().shape({

    theater_name: _VALIDATE?.name,
    theater_address: _VALIDATE?.address,
    theater_city: _VALIDATE?.city,
    theater_state:  _VALIDATE?.state,
    theater_zip:  _VALIDATE?.zip,

    theater_map_location: _VALIDATE?.map_location,
    theater_map_place_id: _VALIDATE?.map_place_id,
    theater_map_long: _VALIDATE?.map_long,
    theater_map_lat: _VALIDATE?.map_lat,

    theater_description: _VALIDATE?.theater_description,
    theater_phone: _VALIDATE?.phone,
    theater_email: _VALIDATE?.email,
    theater_website:  _VALIDATE?.website,

    theater_img_file: _VALIDATE?.theater_img_file,
    image_file_name: _VALIDATE?.image_file_name,

    
});






function TheaterOnBoard({ history }) {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    const initialValues = {
        theater_name: '',
        theater_address: '',
        theater_city: '',
        theater_state: '',
        theater_zip: '',

        theater_map_location: '',
        theater_map_place_id: '',
        theater_map_long: '',
        theater_map_lat: '',

        theater_description: '',
        theater_phone: '',
        theater_email: '',
        theater_website: '',

        theater_img_file: '',
        image_file_name: '',

        coupon_img_file: '',
        coupon_file_name: '',
    };


    const startOnBoardingTheater = (values, actions) => {
        // console.log(values);
        const formData = new FormData();
        formData.append('theater_name', values.theater_name)
        formData.append('address', values.theater_address)
        formData.append('city', values.theater_city)
        formData.append('state', values.theater_state)
        formData.append('zip', values.theater_zip)

        formData.append('formatted_address', values.theater_map_location)
        formData.append('latitude', values.theater_map_lat)
        formData.append('longitude', values.theater_map_long)
        formData.append('place_id', values.theater_map_place_id)

        formData.append('theater_desc', values.theater_description)
        formData.append('contact_info', values.theater_phone)
        formData.append('phone', values.theater_phone)
        formData.append('email', values.theater_email)
        formData.append('website_url', values.theater_website)

        formData.append('image', values.theater_img_file)

        console.log('formData', formData);

        _restServices.createTheater(currentUser?.user, formData).then(
            res => {
                console.log(res);
                actions.setSubmitting(false);
                if (res['status'] === 1) {
                    var userData = { ...currentUser?.user, ...res?.data, }
                    dispatch({ type: authConstants.USER_LOGIN_SUCCESS, userData });
                    NotificationManager.success('Success', 'Theater created successfully');
                } else if (res['status'] === 0) {
                    Object.keys(res['error']).forEach(function (key) {
                        NotificationManager.error(res['error'][key]['message'], 'Field Error');
                    })
                } else {
                    NotificationManager.error('Something went wrong, try again later.');
                }
            },
            error => {
                console.log(error);
                actions.setSubmitting(false);
            }
        );
    };




    return (
        <>

            {currentUser?.user?.theater ? (
                <>
                    <TheaterDashBoard />

                </>) : (
                <>
                    <div id="theater-onboard-section-parent">
                        <h6 className='__text__'><span>Theater Onboarding</span></h6>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                startOnBoardingTheater(values, actions);
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
export default TheaterOnBoard;


