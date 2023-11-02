import React, { useState } from "react";
import { Avatar } from '@material-ui/core';
import {  Row, Col } from "react-bootstrap";
import Moment from 'react-moment';
import Fab from '@material-ui/core/Fab';
// import * as Yup from "yup";
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { _restServices } from "../../../../services/api";
import { useSelector } from "react-redux";
import { Skeleton } from '@material-ui/lab';
import SHARED_ICONS from "../../../../themes/shared_icon";


import BusinessCouponCreation from '../../../../components/global/BusinessCouponCreation'

// const validationSchema = Yup.object().shape({
//     coupon_code: Yup.string()
//         .label("Coupon Code").required("Required*"),
//     coupon_percentage: Yup.number()
//         .label("Coupon %").required("Required*")
//         .positive().integer().min(0, 'min 0').max(100, 'max 100')
// });


function Coupons({ history }) {
    const currentUser = useSelector(state => state.user);
    const [isLoading, setLoading] = useState(false);
    const [couponsData, setCouponsData] = React.useState([]);

    const [showCouponCreateForm, setShowCreateCouponForm] = useState(false);
    const hideForm = () => { setShowCreateCouponForm(false) }

    // const [values, setValues] = React.useState({ coupon_code: '', coupon_percentage: '' });



    // const createCoupon = (values, actions) => {
    //     _restServices.createCoupon(currentUser?.user?.token, values).then(
    //         res => {
    //             actions.setSubmitting(false);
    //             console.log(res);
    //             if (res['status'] === 1) {
    //                 NotificationManager.success('Success', 'Coupon created successfully');
    //                 setValues({ coupon_code: '', coupon_percentage: '' })
    //             } else if (res['status'] === 0) {
    //                 Object.keys(res['error']).forEach(function (key) {
    //                     NotificationManager.error(res['error'][key]['message']);
    //                 })
    //             } else {
    //                 NotificationManager.error('Something went wrong, try again later.');
    //             }
    //         }
    //     );
    // };



    // const editCoupon = (values, actions) => {
    //     // _restServices.createCoupon(currentUser?.user?.token, values).then(
    //     //     res => {
    //     //         actions.setSubmitting(false);
    //     //         console.log(res);
    //     //         if (res['status'] === 1) {
    //     //             NotificationManager.success('Success', 'Coupon created successfully');
    //     //             setValues({ coupon_code: '', coupon_percentage: '' })
    //     //         } else if (res['status'] === 0) {
    //     //             Object.keys(res['error']).forEach(function (key) {
    //     //                 NotificationManager.error(res['error'][key]['message']);
    //     //             })
    //     //         } else {
    //     //             NotificationManager.error('Something went wrong, try again later.');
    //     //         }
    //     //     }
    //     // );
    // };


    React.useEffect(() => getCoupons(), [])

    const getCoupons = async () => {
        setLoading(true)
        const res = await _restServices.getBusinessCreatedCoupons(currentUser.user.token);
        console.log(res);
        setLoading(false)
        if (res?.status === 1) {
            if (res?.status === 1) {
                setCouponsData(res['data'])
            }
        }
    };


    return (
        <>
            <div id="business-coupons-section-parent">
                <div className="coupon-header">
                    <h6 className='__text__'><span>Coupons</span></h6>
                    <Fab variant="extended" size="small" aria-label="add" className='add_btn' onClick={(ev) => { setShowCreateCouponForm(true) }}>
                        {SHARED_ICONS?.MdAdd} New Coupon
                    </Fab>
                </div>

                <div id="coupons-listing">
                    {isLoading && (
                        [0, 0, 0, 0, 0, 0].map((e, key) => {
                            return (<Skeleton key={key} animation="wave" variant="rect" height={50} />)
                        })
                    )}

                    {(!isLoading && (couponsData?.length === 0)) && (
                        <h6 className='no-data'>No discount coupons created</h6>

                    )}

                    {!isLoading && (couponsData?.length > 0) && (
                        <>
                            <Row>
                                <Col md='2' className="logo">
                                    <h6>S No.</h6>
                                </Col>
                                <Col md='3' className='name m-auto'>
                                    <h6>Coupon Name</h6>
                                </Col>
                                <Col md='2' className='value m-auto'>
                                    <h6>Value</h6>
                                </Col>
                                <Col md='3' className='date m-auto'>
                                    <h6>Created Date</h6>
                                </Col>
                                {/* <Col md='2' className='actions-btn m-auto text-center'>
                                    <h6>Action</h6>
                                </Col> */}
                            </Row>

                            {couponsData?.length > 0 && couponsData?.map((e, key) => {
                                return (
                                    <Card className='single-item' key={key}>
                                        <CardContent>
                                            <Row>
                                                <Col md='2' className="logo">
                                                    <div >
                                                        <Avatar>{key + 1}</Avatar>
                                                    </div>
                                                </Col>
                                                <Col md='3' className='name m-auto'>
                                                    <h6>{e?._source?.coupon_code}</h6>
                                                </Col>
                                                <Col md='2' className='value m-auto'>
                                                    <h6>{e?._source?.coupon_percentage}%</h6>
                                                </Col>
                                                <Col md='3' className='date m-auto'>
                                                    <h6><Moment format="DD-MM-YYYY">{e?._source?.follow_by_time}</Moment></h6>
                                                </Col>
                                                {/* <Col md='2' className='actions-btn m-auto'>
                                                    <MatButton
                                                        type="button"
                                                        disableElevation
                                                        className='edit_btn'
                                                        btnText={'Edit'}
                                                        onClick={(ev) => { editCoupon(ev, e) }}
                                                    />
                                                </Col> */}
                                            </Row>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>

            { showCouponCreateForm && (
                <BusinessCouponCreation
                    onClick={hideForm}
                    parentCallback={setShowCreateCouponForm}
                    formShow={showCouponCreateForm}
                    parentCallback2={getCoupons}
                />
            )}

        </>
        // <>
        //     <div id="coupons-section-parent">
        //         <h6 className='__text__'><span>Coupons</span></h6>
        //         <Formik
        //             enableReinitialize={true}
        //             initialValues={values}
        //             validationSchema={validationSchema}
        //             onSubmit={(values, actions) => {
        //                 createCoupon(values, actions);
        //             }}
        //         >
        //             {props => <CouponForm {...props} user={currentUser} />}
        //         </Formik>
        //     </div>
        // </>
    )
}
export default Coupons;
