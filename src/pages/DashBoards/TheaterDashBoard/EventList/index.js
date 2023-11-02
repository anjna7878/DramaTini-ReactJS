import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Row, Col } from "react-bootstrap";
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import Moment from 'react-moment';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { EventForm } from "./EventForm";
import { authConstants } from "../../../../store/_constants";
import IMGS from '../../../../themes/imgs';
import SHARED_ICONS from "../../../../themes/shared_icon";
import { _restServices } from "../../../../services/api";
import _VALIDATE from '../../../../helpers/YupValidationSchema';


const validationSchema = Yup.object().shape({
  event_name: _VALIDATE?.event_name,
  event_venue: _VALIDATE?.event_venue,
  event_description: _VALIDATE?.event_description,
  event_contact_person: _VALIDATE?.event_contact_person,
  event_organizer_no: _VALIDATE?.event_organizer_no,
  event_capacity: _VALIDATE?.event_capacity,
  event_start_date:_VALIDATE?.event_start_date,
  event_end_date: _VALIDATE?.event_end_date,
  event_start_time: _VALIDATE?.event_start_time,
  event_end_time: _VALIDATE?.event_end_time,

});


function EventList({ history }) {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [eventsListData, setEventsListData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const [showEventForm, setShowEventForm] = React.useState(false);
  const [eventId, setShowEventId] = React.useState('');

  const [values, setValues] = React.useState({
    event_name: '',
    event_venue: '',
    event_description: '',
    event_contact_person: '',
    event_organizer_no: '',
    event_capacity: '',
    event_start_date: null,
    event_end_date: null,
    event_start_time: null,
    event_end_time: null

  });

  React.useEffect(() => getEventList(), [])

  const getEventList = async () => {
    setLoading(true);
    const res = await _restServices.getEventList(currentUser?.user?.token);
    setLoading(false)
    if (res?.status === 1) {
      setEventsListData(res['data'])
    }
  };


  const updateTheaterEvent = (values, actions) => {
    console.log(values);
    _restServices.modifyEvent(currentUser?.user, eventId, values).then(
      res => {
        actions.setSubmitting(false);
        if (res['status'] === 1) {
          NotificationManager.success('Success', 'Event modified successfully');
          setShowEventForm(false);
          setEventsListData([]);
          getEventList();
        } else if (res['status'] === 0) {
          Object.keys(res['error']).forEach(function (key) {
            NotificationManager.error(res['error'][key]['message'],);
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



  function clickMe(event, val) {
    console.log(val);
    setShowEventForm(true);
    dispatch({ type: authConstants.USER_PROCESSING_DONE });
    setShowEventId(val._id)
    setValues({
      ...values,
      event_name: val._source.event_name,
      event_venue: currentUser?.user?.theater?._source?.theater_name,
      event_description: val._source.event_description,
      event_contact_person: val._source.organizer_name,
      event_organizer_no: val._source.organizer_phone,
      event_capacity: val._source.guest_capacity,

      event_start_date: val._source.event_start_date,
      event_end_date: val._source.event_end_date,
      event_start_time: val._source.event_start_time,
      event_end_time:val._source.event_end_time,

    
    })
  }


  const hideForm = () => { setShowEventForm(false) }

  return (
    <>

      {!showEventForm && (
        <div id="theater-events-listing-section-parent">
          <h6 className='__text__'><span>Event List</span></h6>
          <div id="event-listing">
            {isLoading && (
              <Segment className='loading-section'>
                <Dimmer active inverted>
                  <Loader indeterminate>Loading</Loader>
                </Dimmer>
              </Segment>
            )}

            {(!isLoading && eventsListData.length === 0) && (
              <>
                <div className="no-data">
                  <h6>No Event Created</h6>
                  <Link to="/dashboard/create-event">Create an event</Link>
                </div>
              </>
            )}


            {!isLoading && eventsListData.length > 0 && eventsListData.map((e, key) => {
              return (
                <Card className='single-event' key={key}>
                  <CardContent>
                    <Row>
                      <Col md='2' className="event-logo">
                        <div >
                          <Avatar alt="Remy Sharp" src={IMGS?.tinis_card} />
                        </div>
                      </Col>
                      <Col md='8' className='event-info'>
                        <h5 className='event_name'>{e?._source?.event_name}</h5>
                        <hr />

                        <div className='event_basic_info'>
                          <p className='event_date mb-0' >{SHARED_ICONS?.MdEvent}  <Moment format="MMM Do YY">{e?._source?.event_start_date}</Moment></p>
                          <p className='event_time mb-0'>{SHARED_ICONS?.BsFillClockFill}  <Moment format="LT">{e?._source?.event_start_time}</Moment></p>
                          <p className='event_venue mb-0'>{SHARED_ICONS?.FaMapMarkerAlt} {currentUser?.user?.theater?._source?.theater_name} </p>
                        </div>
                      </Col>
                      <Col md='2' className='event_actions'>
                        <Button variant="contained" disableElevation className='edit_btn' onClick={(ev) => { clickMe(ev, e) }}>
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </CardContent>
                </Card>
              )
            })}
          </div>

        </div>
      )}

      {showEventForm && (
        <div id="theater-event-update-section-parent">
          <h6 className='__text__'><span>Modify Event</span></h6>
          <Formik
            enableReinitialize={true}
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              updateTheaterEvent(values, actions);
            }}
          >
            {props => <EventForm {...props} user={currentUser} onClick={hideForm} formShow={showEventForm} />}
          </Formik>
        </div>
      )}
    </>
  )
}
export default EventList;