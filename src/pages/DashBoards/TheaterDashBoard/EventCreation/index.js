
import React from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { EventCreateForm } from "./EventCreateForm";
import { NotificationManager } from 'react-notifications';
import { _restServices } from "../../../../services/api";

import _VALIDATE from '../../../../helpers/YupValidationSchema';


const validationSchema = Yup.object().shape({
  event_name: _VALIDATE?.event_name,
  event_venue: _VALIDATE?.event_venue,
  event_description: _VALIDATE?.event_description,
  event_contact_person: _VALIDATE?.event_contact_person,
  event_organizer_no: _VALIDATE?.event_organizer_no,
  event_capacity: _VALIDATE?.event_capacity,

  event_start_date: Yup.date('invalid date').required("Required*").nullable().typeError('Invalid Date* (MM-DD-YYYY)'),
  event_end_date: Yup.date('invalid date').required("Required*").nullable().typeError('Invalid Date* (MM-DD-YYYY)')
      .min(Yup.ref('event_start_date'), "End date can't be before Start date"),

  event_start_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)'),
  event_end_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)')
      .min(Yup.ref('event_start_time'), "End time can't be before Start time"),

});


function EventCreation({ history }) {
  const currentUser = useSelector(state => state.user);



  const initialValues = {
    event_name: '',
    event_venue: currentUser?.user?.theater?._source?.theater_name,
    event_description: '',
    event_contact_person: '',
    event_organizer_no: '',
    event_capacity: '',
    event_start_date: null,
    event_end_date: null,
    event_end_time: null,
    event_start_time: null
};





  const startCreatingEvent = (values, actions) => {
    _restServices.createEvent(currentUser?.user, values).then(
      res => {
        actions.setSubmitting(false);
        if (res['status'] === 1) {
          NotificationManager.success('Success', 'Event created successfully');
          history.push({ pathname: '/dashboard/theater-events' });
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
        NotificationManager.error('Something went wrong, try again later.');
      }
    );
  };

  return (
    <>
      <div id="theater-event-create-section-parent">
        <h6 className='__text__'><span>Event Creation</span></h6>
        {currentUser?.user?.theater ? (
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            // validateOnChange={false}
            // validateOnBlur={false}
            onSubmit={(values, actions) => {
              startCreatingEvent(values, actions);
            }}
          >
            {props => <EventCreateForm {...props} user={currentUser} />}
          </Formik>
        ) : (

          <div className="theater-warning">
            <h5>You need to register/onboard your theater first before creating any event.</h5>
            <Link to="/dashboard/theater">Theater onboard</Link>
          </div>
        )}
      </div>
    </>
  )
}
export default EventCreation;