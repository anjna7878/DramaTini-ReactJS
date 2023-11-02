import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { TheaterForm } from "./TheaterForm";
import {  NotificationManager } from 'react-notifications';

import { _restServices } from "../../../../services/api";
import { authConstants } from "../../../../store/_constants";



const validationSchema = Yup.object().shape({
  theater_name: Yup.string().required("Required*"),
  theater_address: Yup.string().required("Required*"),
  theater_city: Yup.string().required("Required*"),
  theater_state: Yup.string().required("Required*"),
  theater_zip: Yup.string().required("Required*"),

  theater_map_location: Yup.string().required("Required*"),
  theater_map_place_id: Yup.string().required("Required*"),
  theater_map_long: Yup.string().notRequired("Required*"),
  theater_map_lat: Yup.string().notRequired("Required*"),

  theater_description: Yup.string().required("Required*"),

  theater_phone: Yup.string().required("Required*"),
  theater_email: Yup.string().required("Required*"),
  theater_website: Yup.string().required("Required*"),

  theater_img_file: Yup.string().notRequired("Required*"),
  image_file_name: Yup.string().required("Required*"),

});



function Theater({ history }) {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();



  

  const initialValues = {
    theater_name: currentUser?.user?.theater._source.theater_name,
    theater_address: currentUser?.user?.theater._source.address,
    theater_city: currentUser?.user?.theater._source.city,
    theater_state: currentUser?.user?.theater._source.state,
    theater_zip: currentUser?.user?.theater._source.zip,

    theater_map_location: currentUser?.user?.theater._source.formatted_address,
    theater_map_place_id: currentUser?.user?.theater._source.place_id,
    theater_map_long: currentUser?.user?.theater._source.longitude,
    theater_map_lat: currentUser?.user?.theater._source.latitude,

    theater_description: currentUser?.user?.theater._source.theater_desc,
    theater_phone: currentUser?.user?.theater._source.phone,
    theater_email: currentUser?.user?.theater._source.email,
    theater_website: currentUser?.user?.theater._source.website_url,

    theater_img_file: '',
    image_file_name: currentUser?.user?.theater._source.image,

    coupon_img_file: '',
    coupon_file_name: '',
};



  const modifyTheater = (values, actions) => {

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
    formData.append('website_url', values.theater_website)
    formData.append('contact_info', values.theater_phone)
    formData.append('phone', values.theater_phone)
    formData.append('email', values.theater_email)
    if (values.theater_img_file) {
      formData.append('image', values.theater_img_file)
    }

    console.log('formData', formData);

    _restServices.modifyTheater(currentUser?.user, currentUser?.user?.theater._id, formData).then(
      res => {
        console.log(res);
        actions.setSubmitting(false);

        if (res['status'] === 1) {
          var userData = { ...currentUser?.user, ...res?.data, }
          dispatch({ type: authConstants.USER_LOGIN_SUCCESS, userData });
          NotificationManager.success('Updated successfully', 'Success');
        } else if (res['status'] === 0) {
          Object.keys(res['error']).forEach(function (key) {
            NotificationManager.error(res['error'][key]['message'], 'Field Error');
          })
        } else {
          NotificationManager.error('Something went wrong, try again later.');
        }
      },
      error => {
        actions.setSubmitting(false);
      }
    );
  };


  return (
    <>
      <div id="theater-section-parent">
        <h6 className='__text__'><span>Theater</span></h6>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            modifyTheater(values, actions);
          }}
        >
          {props => <TheaterForm {...props} user={currentUser} />}
        </Formik>
      </div>

    </>
  )
}
export default Theater;
