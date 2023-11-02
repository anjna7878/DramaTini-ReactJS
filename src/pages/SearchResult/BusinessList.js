import React, { useState } from "react";
import { useSelector } from "react-redux";
import {  Row, Col, } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import {  NotificationManager } from 'react-notifications';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';


import { MatButton } from "../../components/elements";
import { _restServices } from "../../services/api";
import ICONS from "../../themes/icons";




function BusinessList(props) {

    const currentUser = useSelector(state => state.user);
    const [isProcessing, setProcessing] = useState(false);

    console.log('PROPS on 2nd::', props);
    const [open, setOpen] = useState(false);
    const [popUpData, setPopUpData] = useState({});

    function handleClose() { setOpen(false); }

    function clickMe(event, val) {
        setOpen(true); setProcessing(false);
        console.log('VAL::', val);
        setPopUpData(val)
    }

    function followThis(event, val) {
        console.log('VAL2::', val);

        if (currentUser?.user?._source?.user_role === 'business') {
            NotificationManager.error('A business can only follow theaters');
        } else {
            setProcessing(true);
            _restServices.followBusinessOrTheater(currentUser?.user, val?._index, val?._id).then(
                res => {
                    console.log(res);
                    setProcessing(false);
                    if (res['status'] === 1) {
                        setOpen(false)
                        NotificationManager.success(`You started following ${val?._source?.business_name}`, 'Success');
                    } else if (res['status'] === 0) {
                        Object.keys(res['error']).forEach(function (key) {
                            NotificationManager.error(res['error'][key]['message']);
                        })
                    } else {
                        NotificationManager.error('Something went wrong, try again later.');
                    }
                },
                error => {
                    setProcessing(false);
                    NotificationManager.error('Something went wrong, try again later.');
                }
            );
        }
    }


    return (
        <>
            <div className="single-theater" onClick={(e) => { clickMe(e, props.data) }} >
                <h6>{props.data?._source?.business_name}</h6>
                {/* <p>{props.data?._source?.business_desc}</p> */}
                {/* <p>{props.data?._source?.business_desc}</p> */}
                {props.data?._source?.business_desc.length > 10 ?
                    `${props.data?._source?.business_desc.substring(0, 57)}...` : props.data?._source?.business_desc
                }
            </div>

            <Dialog open={open} onClose={handleClose} id='follow-theater-business-pop-up' fullWidth={true} maxWidth='md' aria-labelledby="form-dialog-title">
                <DialogContent className='body-content'>
                    <Row>
                        <Col md='6' id='theater-image-parent'>
                            <div className="theater-image">
                                <img src={(popUpData?._source?.image) ? `${process.env.REACT_APP_PROFILE_PIC_PRE}/${popUpData?._source?.image}` : ICONS?.user_thumbnail} alt="" />
                            </div>
                        </Col>
                        <Col md='6' id='theater-info-parent'>
                            <IconButton aria-label="close" onClick={handleClose} className='close-btn'>
                                <CloseIcon />
                            </IconButton>
                            <div className="theater-info">
                                <h2>{(popUpData?._source?.business_name) ? popUpData?._source?.business_name : popUpData?._source?.theater_name}</h2>
                                <address>
                                    <h4><b>Address :</b></h4>
                                    <h5>{popUpData?._source?.address}, {popUpData?._source?.city}, {popUpData?._source?.state} {popUpData?._source?.zip} {popUpData?._source?.formatted_address}</h5>
                                </address>

                                <h4 className='mb-2'><b>Email :</b> <span>{popUpData?._source?.email}</span></h4>
                                <h4 className='mb-2'><b>Contact :</b> <span>{popUpData?._source?.phone}</span></h4>
                                <h4 className='mb-2'><b>Website :</b> <span className='website'><a href={popUpData?._source?.website_url}>{popUpData?._source?.website_url}</a> </span></h4>

                                <div className="follow-btn">
                                    <MatButton
                                        type="button"
                                        disableElevation
                                        // btnText={"Follow"}
                                        btnText={isProcessing ? "Please wait" : "Follow"}
                                        isLoading={isProcessing}
                                        onClick={(e) => { followThis(e, props.data) }}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default BusinessList;
