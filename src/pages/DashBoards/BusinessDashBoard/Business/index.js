import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import { Formik } from "formik";

import { authConstants } from "../../../../store/_constants";
import { BusinessForm } from "./BusinessForm";
import { _restServices } from "../../../../services/api";
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

    // business_opening_time: _VALIDATE?.opening_time,
    // business_closing_time: _VALIDATE?.closing_time,

    // business_opening_time: Yup.date('invalid time').required("Required*").nullable(),
    // business_closing_time: Yup.date('invalid time').required("Required*").nullable(),

    business_opening_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)'),
    business_closing_time: Yup.date('invalid time').required("Required*").nullable().typeError('Invalid Time* (HH:MM _M)')
        .min(Yup.ref('business_opening_time'), "End time can't be before Start time"),

    business_description: _VALIDATE?.business_description,
    business_phone: _VALIDATE?.phone,
    business_email: _VALIDATE?.email,
    business_website: _VALIDATE?.website,

    business_img_file: _VALIDATE?.business_img_file,
    image_file_name: _VALIDATE?.image_file_name,

    coupon_selected: _VALIDATE?.coupon_selected,
    qr_code: _VALIDATE?.qr_code,

});


function Business({ history }) {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    // const [preview, setPreview] = useState();


    // const [couponsData, setCouponsData] = React.useState([]);



    const initialValues = {
        business_name: currentUser?.user?.business?._source.business_name,
        business_address: currentUser?.user?.business?._source.address,
        business_city: currentUser?.user?.business?._source.city,
        business_state: currentUser?.user?.business?._source.state,
        business_zip: currentUser?.user?.business?._source.zip,

        business_map_location: currentUser?.user?.business?._source.formatted_address,
        business_map_place_id: currentUser?.user?.business?._source.place_id,
        business_map_long: currentUser?.user?.business?._source.longitude,
        business_map_lat: currentUser?.user?.business?._source.latitude,

        business_description: currentUser?.user?.business?._source.business_desc,
        business_phone: currentUser?.user?.business?._source.phone,
        business_email: currentUser?.user?.business?._source.email,
        business_website: currentUser?.user?.business?._source.website_url,

        business_opening_time: currentUser?.user?.business?._source.business_opening_time,
        business_closing_time: currentUser?.user?.business?._source.business_closing_time,

        business_img_file: '',
        image_file_name: currentUser?.user?.business?._source.image,

        coupon_selected: currentUser?.user?.business?._source.coupon_id,
      
    };


    // setPreview(`${process.env.REACT_APP_PROFILE_PIC_PRE}/${props?.user?.user?.business?._source?.image});

    const updateBusiness = (values, actions) => {

        console.log(values);
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
        formData.append('coupon_id', values.coupon_selected,)

        if (values.theater_img_file) {
            formData.append('image', values.business_img_file)
        }

        _restServices.updateBusiness(currentUser?.user?.token, currentUser?.user?.business._id, formData).then(
            res => {
                actions.setSubmitting(false);
                if (res['status'] === 1) {
                    var userData = { ...currentUser?.user, ...res?.data, }
                    dispatch({ type: authConstants.USER_LOGIN_SUCCESS, userData });
                    NotificationManager.success('Business modified successfully', 'Success');
                } else if (res['status'] === 0) {
                    Object.keys(res['error']).forEach(function (key) {
                        NotificationManager.error(res['error'][key]['message'], 'Field Missing');
                    })
                } else {
                    NotificationManager.error('Something went wrong, try again later.');
                }
            }
        );
    };


    return (
        <>
            <div id="business-section-parent">
                <h6 className='__text__'><span>Business</span></h6>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        updateBusiness(values, actions);
                    }}
                >
                    {props => <BusinessForm {...props} user={currentUser} />}
                </Formik>
            </div>

        </>
    )
}
export default Business;
