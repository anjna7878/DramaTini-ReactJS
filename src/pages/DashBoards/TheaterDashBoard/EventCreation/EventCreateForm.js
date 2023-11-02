import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, } from "react-bootstrap";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
// import Icon from "@material-ui/core/Icon";

import SHARED_ICONS from "../../../../themes/shared_icon";
import { MatButton } from "../../../../components/elements";

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    input: {
        display: 'none',
    },
}));

export const EventCreateForm = props => {
    const classes = useStyles();
    const [minDate, setMinDate] = React.useState(new Date())

    const {
        values: { event_name, event_venue, event_description, event_contact_person, event_organizer_no, event_capacity,
            event_start_date, event_end_date, event_end_time, event_start_time },
        errors,touched,
        // handleSubmit,
        handleChange,handleBlur,
        isValid,
        // setFieldTouched, dirty, 
        setFieldValue,
        isSubmitting,
        // loading
    } = props;


    return (
        <Form autoComplete="off" id='event-create-form'>
            <Row>
                <Col md='6' className='event_name'>
                    <TextField
                        error={errors.event_name && touched.event_name}
                        label="Event Name*"
                        name="event_name"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.event_name) ? errors.event_name : null}
                        value={event_name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.BsInfoCircleFill}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>
                <Col md='6' className='event_venue'>
                    <TextField
                        error={errors.event_venue && touched.event_venue}
                        label="Event Venue*"
                        name="event_venue"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.event_venue) ? errors.event_venue : null}

                        value={event_venue}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaMapMarkerAlt}
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>
                <Col md='12' className='event_description'>
                    <TextField
                        error={errors.event_description && touched.event_description}
                        label="Event Description*"
                        name="event_description"
                        variant="outlined"
                        rows="3"
                        multiline
                        className={classes.textField}
                        helperText={(touched.event_description) ? errors.event_description : null}

                        value={event_description}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaPencilAlt}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>
                <Col md='6' className='event_contact_person'>
                    <TextField
                        error={errors.event_contact_person && touched.event_contact_person}
                        label="Event Organizer/Contractor Name*"
                        name="event_contact_person"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.event_contact_person) ? errors.event_contact_person : null}

                        value={event_contact_person}
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
                <Col md='6' className='event_organizer_no'>
                    <TextField
                        error={errors.event_organizer_no && touched.event_organizer_no}
                        label="Event Organizer/Contractor No*"
                        name="event_organizer_no"
                        variant="outlined"
                        type='number'
                        mask="(0)999 999 99 99"
                        className={classes.textField}
                        helperText={(touched.event_organizer_no) ? errors.event_organizer_no : null}

                        value={event_organizer_no}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.FaPhoneAlt}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth={true}
                    />
                </Col>



                <Col md='6' className='event_start_date'>
                    <KeyboardDatePicker
                        clearable
                        autoOk={true}
                        error={errors.event_start_date && touched.event_start_date}
                        name="event_start_date"
                        helperText={(touched.event_start_date) ? errors.event_start_date : null}

                        className={classes.textField}
                        inputVariant="outlined"
                        label={'Event starting date*'}
                        value={event_start_date}
                        placeholder="MM-DD-YYYY"
                        keyboardIcon={SHARED_ICONS?.BsFillCalendarFill}
                        onChange={date => {
                            setFieldValue("event_start_date", date);
                            setMinDate(date)
                        }}
                        minDate={new Date()}
                        format="MM-dd-yyyy"
                        onBlur={handleBlur}
                        invalidDateMessage={'Invalid Date (MM-DD-YYYY)'}
                        fullWidth={true}

                    />
                </Col>


                <Col md='6' className='event_end_date'>

                    <KeyboardDatePicker
                        clearable
                        autoOk={true}
                        error={errors.event_end_date && touched.event_end_date}
                        name="event_end_date"
                        className={classes.textField}
                        inputVariant="outlined"
                        label={'Event end date*'}
                        value={event_end_date}
                        placeholder="MM-DD-YYYY"
                        onChange={date => { setFieldValue("event_end_date", date) }}
                        minDate={minDate}
                        format="MM-dd-yyyy"
                        onBlur={handleBlur}
                        onError={(error, value) => {
                            // console.log(error, value);
                        }}
                        keyboardIcon={SHARED_ICONS?.BsFillCalendarFill}
                        minDateMessage={'Date should not be before starting date'}
                        helperText={(touched.event_end_date) ? errors.event_end_date : null}

                        invalidDateMessage={'Invalid Date (MM-DD-YYYY)'}
                        fullWidth={true}

                    />
                </Col>






                <Col md='6' className='event_start_time'>

                    <KeyboardTimePicker

                        error={errors.event_start_time && touched.event_start_time}
                        name="event_start_time"
                        autoOk={true}
                        helperText={(touched.event_start_time) ? errors.event_start_time : null}

                        className={classes.textField}
                        inputVariant="outlined"
                        // label="Event Starting Time*"
                        label={'Event start time*'}
                        placeholder="08:00 AM"
                        mask="__:__ _M"
                        value={event_start_time}
                        onChange={date => { setFieldValue("event_start_time", date) }}
                        keyboardIcon={SHARED_ICONS?.BsFillClockFill}
                        onBlur={handleBlur}
                        fullWidth={true}


                        invalidDateMessage={'Invalid Time* (HH:MM _M)'}

                    />
                </Col>

                <Col md='6' className='event_end_time'>
                    {/* <TextField
                        error={errors.event_end_time && touched.event_end_time}
                        label="Event Start Timing"
                        name="event_end_time"
                        variant="standard"
                        type="datetime-local"
                        className={classes.textField}
                        helperText={touched.event_end_time ? errors.event_end_time : null}
                        value={event_end_time}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.MdEvent}
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    // fullWidth
                    /> */}
                    <KeyboardTimePicker
                        // disableToolbar
                        error={errors.event_end_time && touched.event_end_time}
                        name="event_end_time"
                        autoOk={true}
                        helperText={(touched.event_end_time) ? errors.event_end_time : null}

                        className={classes.textField}
                        inputVariant="outlined"
                        // label="Closing Time*"
                        label={'Event closing time*'}
                        placeholder="11:00 PM"
                        mask="__:__ _M"
                        value={event_end_time}
                        onChange={date => { setFieldValue("event_end_time", date) }}
                        keyboardIcon={SHARED_ICONS?.BsFillClockFill}
                        onBlur={handleBlur}
                        fullWidth={true}
                        invalidDateMessage={'Invalid Time* (HH:MM _M)'}
                        minDateMessage={'Time should not be before starting time'}
                    />

                </Col>


                <Col md='6' className='event_capacity'>
                    <TextField
                        error={errors.event_capacity && touched.event_capacity}
                        label="Max Guests allowed*"
                        name="event_capacity"
                        variant="outlined"
                        type='number'
                        className={classes.textField}
                        helperText={(touched.event_capacity) ? errors.event_capacity : null}

                        value={event_capacity}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {SHARED_ICONS?.MdEventSeat}
                                </InputAdornment>
                            ),
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
                    btnText={isSubmitting ? "Please wait" : "Submit"}
                    isLoading={isSubmitting}
                    disabled={isSubmitting || !isValid}
                />
            </div>
        </Form>
    );
};
