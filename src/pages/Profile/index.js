
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import { Formik } from "formik";

import { ProfileForm } from "./ProfileForm";
import ChangePassword from "../../components/global/ChangePassword";
import { authConstants } from "../../store/_constants";
import { _restServices } from "../../services/api";
import _VALIDATE from '../../helpers/YupValidationSchema';


const validationSchema = Yup.object().shape({
  first_name:_VALIDATE?.name,
  last_name:_VALIDATE?.name,
  phone:_VALIDATE?.phone,
  email: _VALIDATE?.email,
  type:Yup.string().notRequired(),
  id:Yup.string().notRequired(),
 
});


function ProfilePage({ history }) {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const deleteMe = () => {
    _restServices.deleteMyself(currentUser?.user,currentUser?.user?._id ).then(
        res => {
        },
        error => {
            NotificationManager.error('Something went wrong, try again later.');
        }
    );
};




  const initialValues = { 
    id: currentUser?.user?._id,
    first_name: currentUser?.user?._source?.first_name,
    last_name: currentUser?.user?._source?.last_name,
    email: currentUser?.user?._source?.email,
    phone: currentUser?.user?._source?.phone,
    type: currentUser?.user?._source?.user_role,
    live_preference: '',
    theater_location: '',
    business_location: '',
  };



  const updateProfile = (values, actions)=> {
    _restServices.updateProfile(currentUser?.user?.token, values).then(
      res => {
        actions.setSubmitting(false);
        if (res['status'] === 1) {
          var userData = { ...currentUser?.user, ...res?.data, }
          dispatch({ type: authConstants.USER_LOGIN_SUCCESS, userData });
          NotificationManager.success(res['message'], 'Success');

        } else if (res['status'] === 0) {
          Object.keys(res['error']).forEach(function (key) {
            NotificationManager.error(res['error'][key]['message'], 'Field Error');
          })
        } else {
          NotificationManager.error('Something went wrong, try again later.');
        }
      }
    );
  };

  return (
    <>
      <div id="profile-section-parent">
        <h6 className='__text__'><span>Complete Your Profile</span></h6>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            updateProfile(values,actions);
          }}
        >
          {props => <ProfileForm {...props} user={currentUser} />}
        </Formik>
        <ChangePassword />
        <h6 onClick={(e) => { deleteMe(e) }}>Delete me</h6>
      </div>
    </>
  )
}
export default ProfilePage;

