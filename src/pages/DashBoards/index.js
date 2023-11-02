import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';
import { Switch, Route } from "react-router-dom";
import { Skeleton } from '@material-ui/lab';

import { authConstants } from "../../store/_constants";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import ICONS from "../../themes/icons";
import { ALink } from "../../components/elements";
import { _restServices } from "../../services/api";
import SHARED_ICONS from "../../themes/shared_icon";


function DashBoardsPage({ history, routes }) {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isUploading, setUploading] = useState(false)

    return (
        <>
            <Layout sectionId="user-dashboard-section">
                <NavBar />
                <Container>
                    <div id="user-dashboard-parent">
                        <Row>
                            <Col md='3' id='dashboard-menu-panel' >
                                <div className="user-info">
                                    <div className="profile-pic">
                                        <input
                                            accept="image/*"
                                            id="profile-button-file"
                                            type="file"
                                            onChange={(event) => {
                                                if (event.currentTarget.files[0]) {
                                                    const fileExt = event.currentTarget.files[0].name.split('.').pop();
                                                    if ((['jpg', 'jpeg', 'png'].indexOf(fileExt) > -1)) {
                                                        const formData = new FormData();
                                                        formData.append('image', event.currentTarget.files[0]);
                                                        setUploading(true)
                                                        _restServices.updateProfilePic(currentUser?.user, formData).then(
                                                            res => {
                                                                setUploading(false)

                                                                console.log(res);
                                                                if (res['status'] === 1) {
                                                                    NotificationManager.success('Profile image updated successfully', 'Success');
                                                                    var userData = { ...currentUser?.user, ...res?.data, }
                                                                    dispatch({ type: authConstants.USER_LOGIN_SUCCESS, userData });
                                                                } else {
                                                                    NotificationManager.error('Update Failed', 'Something went wrong try again');
                                                                }
                                                            }
                                                        );
                                                    } else {
                                                        NotificationManager.error('Please choose jpg,jpeg and png file', 'Wrong Image File');
                                                    }
                                                }
                                            }}
                                        />
                                        <label htmlFor="profile-button-file" >
                                            {!isUploading && (
                                                <img src={(currentUser?.user?._source?.image) ? `${process.env.REACT_APP_PROFILE_PIC_PRE}/${currentUser?.user?._source?.image}` : ICONS?.user_thumbnail} alt="" />
                                            )}
                                            {isUploading && (
                                                <Skeleton animation="wave" variant="circle" width={150} height={150} />
                                            )}

                                            <div className="overlay">
                                                <span className="user-upload-icon" >{SHARED_ICONS?.IoMdCloudUpload}</span>
                                                <h6>Upload Image</h6>
                                            </div>
                                            <span className="user-edit-btn">{SHARED_ICONS?.FaUserEdit}</span>
                                        </label>
                                    </div>
                                    <h4>{currentUser.user._source?.first_name} {currentUser.user._source?.last_name}</h4>
                                    <p>{currentUser.user._source?.email}</p>


                                </div>
                                <div className="dashboard-menu">

                                    <ul className="navbar-nav">
                                        <ALink icon={ICONS.edit_icon} activeOnlyWhenExact={true} to="/dashboard" label="Profile" />

                                        {currentUser?.user?._source?.user_role === 'business' && (
                                            <>
                                                <ALink icon={ICONS.business1_icon} to="/dashboard/business" label={(currentUser?.user?.business) ? 'Business' : 'Business OnBoarding'} />
                                                <ALink icon={ICONS.coupons_icon} to="/dashboard/coupons" label="Coupons" />
                                            </>
                                        )}

                                        {currentUser?.user?._source?.user_role === 'theater' && (
                                            <>
                                                <ALink icon={ICONS.business1_icon} to="/dashboard/theater" label={(currentUser?.user?.theater) ? 'Theater' : 'Theater/Venue OnBoarding'} />
                                                <ALink icon={ICONS.event_list_icon} to="/dashboard/theater-events" label="Event List" />
                                                <ALink icon={ICONS.business1_icon} to="/dashboard/create-event" label="Create Event" />
                                            </>
                                        )}
                                        {currentUser?.user?._source?.user_role === 'tini' && (
                                            <>
                                                <ALink icon={ICONS.heart_icon} to="/dashboard/tini-follow-list" label="Follow List" />
                                            </>
                                        )}

                                        <ALink icon={ICONS.logout_icon} to="/logout" label="Logout" />
                                    </ul>
                                </div>
                            </Col>

                            <Col md={{ span: 8, offset: 1 }}>
                                <Switch>
                                    {routes.map((route, i) => (
                                        <RouteWithSubRoutes key={i} {...route} />
                                    ))}
                                </Switch>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Layout>
        </>
    )
}
export default DashBoardsPage;


function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
