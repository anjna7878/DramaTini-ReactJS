import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { _spaceServices } from "../../../../services/api";
import { NotificationManager } from 'react-notifications';

import { Row, Col, } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';



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




export const OnBoardForm = props => {
    const classes = useStyles();
    const [addressError, setAddressError] = React.useState(false);
    const [preview, setPreview] = useState()



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
            setFieldValue("theater_map_location", '');
            setFieldValue("theater_map_place_id", '');
            setFieldValue("theater_map_long", '');
            setFieldValue("theater_map_lat", '');

            setFieldValue("theater_city", '');
            setFieldValue("theater_state", '');
            setFieldValue("theater_zip", '');
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
                        setFieldValue("theater_map_location", res['results'][0].formatted_address);
                        setFieldValue("theater_map_place_id", res['results'][0].place_id);
                        setFieldValue("theater_map_long", res['results'][0].geometry.location.lng);
                        setFieldValue("theater_map_lat", res['results'][0].geometry.location.lat);

                        setFieldValue("theater_city", value[count - 3]);

                        if (value[count - 2].split(" ").length > 2) {
                            setFieldValue("theater_state", value[count - 2].substring(0, value[count - 2].lastIndexOf(" ")));
                            setFieldValue("theater_zip", value[count - 2].split(" ").pop());
                        } else if (value[count - 2].split(" ").length <= 2) {
                            setFieldValue("theater_state", value[count - 2].split(" ").pop());
                            setFieldValue("theater_zip", '');
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
        values: { theater_name, theater_address, theater_city, theater_state, theater_zip, theater_phone, theater_email,
            theater_website, theater_description, image_file_name

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
        <Form autoComplete="off" id='theater-onboard-form'>
            <Row>
                <Col md='6' className='theater_name'>
                    <TextField
                        error={errors.theater_name && touched.theater_name}
                        label="Theater/Venue Name*"
                        name="theater_name"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.theater_name) ? errors.theater_name : null}
                        value={theater_name}
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


                <Col md='6' className='theater-map-location'>
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


                        {!addressError && <FormHelperText className='error-field'>{errors.theater_map_location}</FormHelperText>}
                        {addressError && <FormHelperText className='error-field'>'Not Acceptable'</FormHelperText>}



                    </FormControl>

                </Col>



                <Col md='6' className='theater_address'>
                    <TextField
                        error={errors.theater_address && touched.theater_address}
                        label="Complete Address (Apartment, suite, floor/#)*"
                        name="theater_address"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.theater_address) ? errors.theater_address : null}

                        value={theater_address}
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
                <Col md='6' className='theater_city'>
                    <TextField
                        error={errors.theater_city && touched.theater_city}
                        label="City*"
                        name="theater_city"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.theater_city) ? errors.theater_city : null}

                        value={theater_city}
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
                <Col md='6' className='theater_state'>
                    <TextField
                        error={errors.theater_state && touched.theater_state}
                        label="State*"
                        name="theater_state"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.theater_state) ? errors.theater_state : null}

                        value={theater_state}
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
                <Col md='6' className='theater_zip'>
                    <TextField
                        error={errors.theater_zip && touched.theater_zip}
                        label="Postal Code*"
                        name="theater_zip"
                        variant="outlined"
                        type="number"
                        className={classes.textField}
                        helperText={(touched.theater_zip) ? errors.theater_zip : null}

                        value={theater_zip}
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





                <Col md='12' className='theater_description'>
                    <TextField
                        error={errors.theater_description && touched.theater_description}
                        label="Theater Description*"
                        name="theater_description"
                        variant="outlined"
                        rows="3"
                        multiline
                        className={classes.textField}
                        helperText={(touched.theater_description) ? errors.theater_description : null}

                        value={theater_description}
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



                <Col md='6' className='theater_phone'>
                    <TextField
                        error={errors.theater_phone && touched.theater_phone}
                        label="Phone No*"
                        name="theater_phone"
                        variant="outlined"
                        type="number"
                        className={classes.textField}
                        helperText={(touched.theater_phone) ? errors.theater_phone : null}

                        value={theater_phone}
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
                <Col md='6' className='theater_email'>
                    <TextField
                        error={errors.theater_email && touched.theater_email}
                        label="Email Address*"
                        name="theater_email"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.theater_email) ? errors.theater_email : null}

                        value={theater_email}
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
                <Col md='6' id='file-upload'>
                    <TextField
                        error={errors.image_file_name && touched.image_file_name}
                        label="Image of Establishment*"
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
                        id="contained-button-file"
                        type="file"
                        onChange={(event) => {
                            setFieldValue("theater_img_file", event.currentTarget.files[0]);
                            setFieldValue("image_file_name", event.currentTarget.files[0].name);

                            const objectUrl = URL.createObjectURL(event.currentTarget.files[0])
                            setPreview(objectUrl)
                        }}
                    />
                    <label htmlFor="contained-button-file" id='upload-btn1'>
                        <Button variant="contained" component="span" disableElevation>
                            Upload
                         </Button>
                    </label>
                </Col>

                <Col md='6' className='website'>
                    <TextField
                        error={errors.theater_website && touched.theater_website}
                        label="Website* (eg. https://abc.com)"
                        name="theater_website"
                        variant="outlined"
                        className={classes.textField}
                        helperText={(touched.theater_website) ? errors.theater_website : null}

                        value={theater_website}
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
    );
};














