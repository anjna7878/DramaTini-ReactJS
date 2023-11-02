import * as Yup from "yup";
import { setLocale } from 'yup';

setLocale({
    mixed: {
        default: 'Default Error',
    },
    number: {
        min: 'Min age ${min}',
        max: 'Min age ${max}',
        positive: 'Invalid',
        integer: 'Invalid'
    },
});




const _VALIDATE = {
    // ---------------------------Sign in-----------------------------
    registered_email: Yup.string()
        .required("Please enter a registered email address*")
        .email("Invalid Email address*")
        .matches('^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[_a-zA-Z0-9])+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$', 'Invalid Email address*'),
    password: Yup.string()
        .required("Required*")
        .min(6, "Password must have at least 6 characters ")
        .max(24, "Try a shorter password."),
    // ---------------------------SIgn in-----------------------------
    confirm_password: Yup.string().required("Required*")
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(6, "Password must have at least 6 characters ")
        .max(24, "Try a shorter password."),

    age: Yup.number().min(18).max(100).positive().integer().typeError('Age must be a number'),

    // ---------------------------Sign up-----------------------------
    first_name: Yup.string().required("First name required*"),
    last_name: Yup.string().required("Last name required*"),
    email: Yup.string()
        .required("Please enter a valid email address*")
        .email("Invalid Email address*")
        .matches('^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[_a-zA-Z0-9])+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$', 'Invalid Email address*'),

    new_password: Yup.string().required("Required*")
        .min(6, "Password must have at least 6 characters ")
        .max(24, "Try a shorter password."),

    confirm_new_password: Yup.string().required("Required*")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .min(6, "Password must have at least 6 characters ")
        .max(24, "Try a shorter password."),
    sign_up_type: Yup.string().required("Required*"),
    agreeTerms: Yup.bool(),
    // ---------------------------Sign up-----------------------------
    phone: Yup.string().required("Required*")
        .min(10, "Not a valid 10-digit US phone number")
        .max(10, "Not a valid 10-digit US phone number")
        .typeError('Not a valid 10-digit US phone number'),

    website: Yup.string()
        .required("Required*")
        .url()
        .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Invalid url* (http/https://abc.com)'),

    // ---------------------------business create/modify-----------------------------

    name: Yup.string().required("Required*"),
    address: Yup.string().required("Required*"),
    city: Yup.string().required("Required*"),
    state: Yup.string().required("Required*"),
    zip: Yup.string().required("Required*")
        .min(3, "Invalid postal code*")
        .max(6, "Invalid postal code*"),

    map_location: Yup.string().required("Required*"),
    map_place_id: Yup.string().required("Required*"),
    map_long: Yup.string().notRequired("Required*"),
    map_lat: Yup.string().notRequired("Required*"),

    opening_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)'),
    closing_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)')
        .min(Yup.ref('opening_time'), "End time can't be before Start time"),

    business_description: Yup.string().required("Required*"),
    business_img_file: Yup.string().notRequired("Required*"),
    image_file_name: Yup.string().required("Required*"),
    coupon_selected: Yup.string().notRequired("Required*"),
    qr_code: Yup.string().notRequired("Required*"),

    // ---------------------------business create/modify-----------------------------


    theater_description: Yup.string().required("Required*"),
    theater_img_file: Yup.string().notRequired("Required*"),

    //------------------- coupon----------------------
    coupon_code: Yup.string().required("Required*"),
    coupon_percentage: Yup.number().required("Required*")
        .positive('Invalid Entry').integer('Invalid Entry').min(0, 'min 0*').max(100, 'max 100*'),
    //------------------- coupon----------------------


    //----------------- event create/modify------------
    event_name: Yup.string().required("Required*"),
    event_venue: Yup.string().required("Required*"),
    event_description: Yup.string().required("Required*"),
    event_contact_person: Yup.string().required("Required*"),
    event_organizer_no: Yup.string().required("Required*")
        .min(10, "Not a valid 10-digit US phone number")
        .max(10, "Not a valid 10-digit US phone number")
        .typeError('Not a valid 10-digit US phone number'),

    event_capacity: Yup.number().required("Required*")
        .min(1, 'Invalid Entry')
        .max(99999, 'Too large number of guests'),

    event_start_date: Yup.date('invalid date').required("Required*").nullable().typeError('Invalid Date* (MM-DD-YYYY)'),
    event_end_date: Yup.date('invalid date').required("Required*").nullable().typeError('Invalid Date* (MM-DD-YYYY)')
        .min(Yup.ref('event_start_date'), "End date can't be before Start date"),

    event_start_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)'),
    event_end_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)')
        .min(Yup.ref('event_start_time'), "End time can't be before Start time"),



    //----------------- event create/modify------------

};

export default _VALIDATE;
