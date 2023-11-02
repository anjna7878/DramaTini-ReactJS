import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { Row, Col } from "react-bootstrap";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { NotificationManager } from 'react-notifications';
import { _restServices, _spaceServices } from "../../../../services/api";
import SHARED_ICONS from "../../../../themes/shared_icon";
import { MatButton } from "../../../../components/elements";
import BusinessCouponCreation from '../../../../components/global/BusinessCouponCreation'


import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}
const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));


export const OnBoardForm = props => {
    const classes = useStyles();
    const [couponsData, setCouponsData] = React.useState([]);
    const [isFetching, setIsFetching] = React.useState(false);

    const [addressError, setAddressError] = React.useState(false);
    const [preview, setPreview] = useState()

    const [showCouponCreateForm, setShowCreateCouponForm] = useState(false);
    const hideForm = () => { setShowCreateCouponForm(false) }


    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);


    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyApZFuYkOPZQ7E4jlgD8DwG5hNpXom1Aks&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            setFieldValue("business_map_location", '');
            setFieldValue("business_map_place_id", '');
            setFieldValue("business_map_long", '');
            setFieldValue("business_map_lat", '');

            setFieldValue("business_city", '');
            setFieldValue("business_state", '');
            setFieldValue("business_zip", '');
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);


    React.useEffect(() => getCoupons(), [])
    const getCoupons = async () => {
        setIsFetching(true);
        const res = await _restServices.getBusinessCreatedCoupons(props.user.user.token);
        setIsFetching(false);
        if (res?.status === 1) {
            setCouponsData(res['data'])
        }
    };


    const getGeoLocation = (place) => {
        console.log('values', place);
        if (place) {
            _spaceServices.getGeoLocation(place?.place_id).then(
                res => {
                    console.log(res);

                    var address = res['results'][0].formatted_address;
                    var value = address.split(",");
                    var count = value.length;

                    // console.log(value[count - 1]);
                    // console.log('statezip',value[count-2]);
                    // console.log('state', value[count - 2].substring(0, value[count - 2].lastIndexOf(" ")));
                    // console.log('zip', value[count - 2].split(" ").pop());
                    // console.log('city', value[count - 3]);


                    if (value[count - 3] && value[count - 2].split(" ").pop()) {
                        setFieldValue("business_map_location", res['results'][0].formatted_address);
                        setFieldValue("business_map_place_id", res['results'][0].place_id);
                        setFieldValue("business_map_long", res['results'][0].geometry.location.lng);
                        setFieldValue("business_map_lat", res['results'][0].geometry.location.lat);

                        setFieldValue("business_city", value[count - 3]);

                        if (value[count - 2].split(" ").length > 2) {
                            setFieldValue("business_state", value[count - 2].substring(0, value[count - 2].lastIndexOf(" ")));
                            setFieldValue("business_zip", value[count - 2].split(" ").pop());
                        } else if (value[count - 2].split(" ").length <= 2) {
                            setFieldValue("business_state", value[count - 2].split(" ").pop());
                            setFieldValue("business_zip", '');
                        }
                        setAddressError(false)

                    } else {
                        setAddressError(true)
                    }
                },
                error => {
                    NotificationManager.error('Something went wrong, try again later.');
                }
            );
        }

    };


    const {
        values: { business_name, business_address, business_city, business_state, business_zip, business_phone, 
            business_description, business_email, business_website, coupon_selected, 
            business_opening_time, business_closing_time,image_file_name,

        },
        errors,
        touched,
        // handleSubmit,
        handleChange,
        handleBlur,
        isValid,
        // setFieldTouched,
        // dirty, 
        setFieldValue,
        isSubmitting,
        // loading
    } = props;
    // console.table(props);







    return (
        <>
            <Form autoComplete="off" id='business-onboard-form'>
                <Row>
                    <Col md='6' className='business_name'>
                        <TextField
                            error={errors.business_name && touched.business_name}
                            label="Business Name*"
                            name="business_name"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_name) ? errors.business_name : null}
                            value={business_name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaSuitcase}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />
                    </Col>
                    <Col md='6' className='business-map-location'>
                        <FormControl error={(errors.business_map_location || addressError) ? true : null} style={{ width: '100%' }} >
                            <Autocomplete
                                id="google-map-demo"
                                getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                                filterOptions={(x) => x}
                                options={options}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                value={value}

                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    console.log(newValue?.place_id);
                                    getGeoLocation(newValue)

                                    setOptions(newValue ? [newValue, ...options] : options);
                                    setValue(newValue);
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Search address on Google Map*" variant="outlined" fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {SHARED_ICONS?.FaMapMarkerAlt}
                                                </InputAdornment>
                                            ),
                                        }} />
                                )}
                                renderOption={(option) => {
                                    const matches = option.structured_formatting.main_text_matched_substrings;
                                    const parts = parse(
                                        option.structured_formatting.main_text,
                                        matches.map((match) => [match.offset, match.offset + match.length]),
                                    );

                                    return (
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <LocationOnIcon className={classes.icon} />
                                            </Grid>
                                            <Grid item xs>
                                                {parts.map((part, index) => (
                                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                        {part.text}
                                                    </span>
                                                ))}

                                                <Typography variant="body2" color="textSecondary">
                                                    {option.structured_formatting.secondary_text}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    );
                                }}
                            />
                            {!addressError && <FormHelperText className='error-field'>{errors.business_map_location}</FormHelperText>}
                            {addressError && <FormHelperText className='error-field'>'Not Acceptable'</FormHelperText>}

                        </FormControl>
                    </Col>
                    <Col md='6' className='business_address'>
                        <TextField
                            error={errors.business_address && touched.business_address}
                            label="Complete Address (Apartment, suite, floor/#)*"
                            name="business_address"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_address) ? errors.business_address : null}
                            value={business_address}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaMapMarkerAlt}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />
                    </Col>
                    <Col md='6' className='business_city'>
                        <TextField
                            error={errors.business_city && touched.business_city}
                            label="City*"
                            name="business_city"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_city) ? errors.business_city : null}
                            value={business_city}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaCity}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />
                    </Col>
                    <Col md='6' className='business_state'>
                        <TextField
                            error={errors.business_state && touched.business_state}
                            label="State/Province*"
                            name="business_state"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_state) ? errors.business_state : null}
                            value={business_state}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaCity}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />
                    </Col>
                    <Col md='6' className='business_zip'>
                        <TextField
                            error={errors.business_zip && touched.business_zip}
                            label="Postal Code*"
                            name="business_zip"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_zip) ? errors.business_zip : null}
                            value={business_zip}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaExpandArrowsAlt}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                        />
                    </Col>



                    <Col md='12' className='business_description'>
                        <TextField
                            error={errors.business_description && touched.business_description}
                            label="Business Description*"
                            name="business_description"
                            variant="outlined"
                            rows="3"
                            multiline
                            className={classes.textField}
                            helperText={(touched.business_description) ? errors.business_description : null}
                            value={business_description}
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

                    <Col md='6' className='business_email'>
                        <TextField
                            error={errors.business_email && touched.business_email}
                            label="Email Address*"
                            name="business_email"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_email) ? errors.business_email : null}
                            value={business_email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaEnvelope}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />
                    </Col>
                    <Col md='6' className='website'>
                        <TextField
                            error={errors.business_website && touched.business_website}
                            label="Website* (eg. https://abc.com)"
                            name="business_website"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.business_website) ? errors.business_website : null}
                            value={business_website}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaGlobe}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />
                    </Col>
                    <Col md='6' className='operation_hours'>

                        <Row>
                            <Col md={{ span: 6 }}>
                                <KeyboardTimePicker
                                    error={errors.business_opening_time && touched.business_opening_time}
                                    name="business_opening_time"
                                    helperText={errors.business_opening_time}
                                    autoOk={true}
                                    className={classes.textField}
                                    inputVariant="outlined"
                                    label="Opening Time*"
                                    placeholder="08:00 PM"
                                    mask="__:__ _M"
                                    value={business_opening_time}
                                    onChange={date => { setFieldValue("business_opening_time", date) }}
                                    keyboardIcon={SHARED_ICONS?.BsFillClockFill}
                                    onBlur={handleBlur}
                                />
                            </Col>
                            <Col md={{ span: 6 }}>
                                <KeyboardTimePicker
                                    error={errors.business_closing_time && touched.business_closing_time}
                                    name="business_closing_time"
                                    helperText={errors.business_closing_time}
                                    autoOk={true}
                                    className={classes.textField}
                                    inputVariant="outlined"
                                    label="Closing Time*"

                                    placeholder="08:00 PM"
                                    mask="__:__ _M"
                                    value={business_closing_time}
                                    onChange={date => { setFieldValue("business_closing_time", date) }}
                                    keyboardIcon={SHARED_ICONS?.BsFillClockFill}
                                    onBlur={handleBlur}
                                />
                            </Col>

                        </Row>



                    </Col>
                    <Col md='6' id='coupon-selection'>
                        {/* <FormControl error={(errors.coupon_selected) ? true : null} >
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Select Coupon(optional)
                        </InputLabel>
                            <Select
                                value={coupon_selected}
                                onChange={handleChange}
                                name="coupon_selected"
                                onBlur={handleBlur}
                                fullWidth={true}
                            >
                                {(couponsData?.length === 0) &&
                                    <MenuItem value="">  <em>No any coupon created</em>  </MenuItem>
                                }
                                {couponsData.map((e, key) => {
                                    // return <option key={key} value={e.value}>{e.name}</option>;
                                    return <MenuItem key={key} value={e?._id} >{e?._source?.coupon_code} [{e?._source?.coupon_percentage}%] </MenuItem>;
                                })}
                            </Select>
                            <FormHelperText className='error-field'>{errors.coupon_selected}</FormHelperText>
                        </FormControl>
                        <label htmlFor="contained-button-file1" id='upload-btn2'>
                            <Button variant="contained" component="span" disableElevation onClick={(ev) => { setShowCreateCouponForm(true) }}>
                                Add
                         </Button>
                        </label> */}




                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Select Coupon(optional)</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                name="coupon_selected"
                                value={coupon_selected}
                                onChange={handleChange}
                                label="Select coupon(optional)"
                                onBlur={handleBlur}
                                fullWidth={true}
                                inputProps={{ readOnly: isFetching }}
                            >
                                {(couponsData?.length === 0) &&
                                    <MenuItem value="">  <em>No any coupon created</em>  </MenuItem>
                                }
                                {couponsData.map((e, key) => {

                                    return <MenuItem key={key} value={e?._id} >{e?._source?.coupon_code} [{e?._source?.coupon_percentage}%] </MenuItem>;
                                })}
                            </Select>
                            <FormHelperText className='error-field'>{errors.coupon_selected}</FormHelperText>
                        </FormControl>
                        <label htmlFor="contained-button-file1" id='create_coupon_btn'>
                            <MatButton
                                type="button"
                                disableElevation
                                btnText={isFetching ? null : "Add"}
                                isLoading={isFetching}
                                disabled={isFetching}
                                onClick={(ev) => { setShowCreateCouponForm(true) }}
                            />
                        </label>
                    </Col>


                    <Col md='6' className='business_phone'>
                        <TextField
                            error={errors.business_phone && touched.business_phone}
                            label="Phone No"
                            name="business_phone"
                            variant="outlined"
                            type='number'
                            className={classes.textField}
                            helperText={touched.business_phone ? errors.business_phone : null}
                            value={business_phone}
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
                    <Col md='6' id='file-upload'>
                        <TextField
                            error={errors.image_file_name && touched.image_file_name}
                            label="Image of Establishment "
                            name="image_file_name"
                            variant="outlined"
                            className={classes.textField}
                            helperText={(touched.image_file_name) ? errors.image_file_name : null}

                            value={image_file_name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SHARED_ICONS?.FaImage}
                                    </InputAdornment>
                                ),
                                readOnly: true
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth={true}
                        />

                        <input
                            accept="image/*"
                            className={classes.input}
                            id="business-establishment-button-file"
                            type="file"
                            onChange={(event) => {
                                if (event.currentTarget.files[0]) {
                                    setFieldValue("business_img_file", event.currentTarget.files[0]);
                                    setFieldValue("image_file_name", event.currentTarget.files[0].name);

                                    const objectUrl = URL.createObjectURL(event.currentTarget.files[0])
                                    setPreview(objectUrl)
                                }
                            }}
                        />
                        <label htmlFor="business-establishment-button-file" id='upload-btn1'>
                            <Button variant="contained" component="span" disableElevation>
                                Upload
                         </Button>
                        </label>
                    </Col>

                    {image_file_name && (
                        <Col md='12' id='image-preview'>
                            <Row>
                                <Col className='m-auto'>
                                    <h6 className='text-center pink'>Image Preview :</h6>
                                </Col>
                                <Col>
                                    <div className='img-box'>
                                        <img src={preview} alt='preview' />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    )}
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
            { showCouponCreateForm && (
                <BusinessCouponCreation
                    onClick={hideForm}
                    parentCallback={setShowCreateCouponForm}
                    formShow={showCouponCreateForm}
                    parentCallback2={getCoupons}
                />
            )}
        </>
    );
};














