import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import * as Yup from "yup";
import { Formik } from "formik";
import LoadingOverlay from 'react-loading-overlay';

import SocialButton from '../../components/elements/SocialButton'
import { logout } from "../../store/_actions";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import { registration } from "../../store/_actions";
import { doSocialRegistration } from "../../store/_actions";
import { SignUpForm } from "./SignUpForm";
import { SHARED_ICONS } from "../../themes";
import _VALIDATE from '../../helpers/YupValidationSchema';



const validationSchema = Yup.object().shape({
  first_name: _VALIDATE?.first_name,
  last_name: _VALIDATE?.last_name,
  email: _VALIDATE?.email,
  password: _VALIDATE?.password,
  // confirm_password: _VALIDATE?.confirm_password,
  confirm_password: Yup.string().required("Required*")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6, "Password must have at least 6 characters ")
    .max(24, "Try a shorter password."),
  sign_up_type: _VALIDATE?.sign_up_type,
  agreeTerms: Yup.bool()
});


function SignUp({ props }) {
  const history = useHistory();
  const location = useLocation();
  const currentUser = useSelector(state => state.user);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.userType) {
      history.push('/')
    }
  }, [location]);


  useEffect(() => {
    if (!currentUser?.isAuthenticated) {
      dispatch(logout());
    }
  }, []);


  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    user_role: location?.state?.userType,
    sign_up_type: 'normal',
    agreeTerms: true
  };


  const doTryRegistration = values => {
    dispatch(registration(values)).then(res => {
      handleRegistrationSuccess(res);
    })
  };


  const handleSocialRegistration = (user) => {
    console.log('====================================');
    console.log('SOCIAL_REG_USER::', user);
    console.log('====================================');
    const body = {
      first_name: user?._profile?.firstName,
      last_name: user?._profile?.lastName,
      facebook_id: user?._profile?.id,
      google_id: user?._profile?.id,
      access_token: user?._token?.accessToken,
      email: user?._profile?.email,
      user_role: location?.state?.userType,
      phone: '',
      sign_up_type: user?._provider,
      image: user?._profile?.profilePicURL
    }
    setSubmitting(true);

    dispatch(doSocialRegistration(body)).then(res => {
      setSubmitting(false);
      handleRegistrationSuccess(res);
    })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      })
  }


  const handleRegistrationSuccess = res => {
    if (res['status'] === 200 && res['data']['status'] === 1) {
      switch (res['data']['data']['_source']['user_role']) {
        case 'business':
          history.push({ pathname: '/dashboard/business' })
          break;
        case 'theater':
          history.push({ pathname: '/dashboard/theater' })
          break;

        case 'tini':
          history.push({ pathname: '/dashboard' })
          break;

        default:
          history.push({ pathname: '/' })
          break;
      }
    }
  }


  const handleSocialRegistrationFailure = (err) => {
    console.log('====================================');
    console.log('SOCIAL_REG_FAIL::', err);
    console.log('====================================');
    if (typeof (err) != 'object') {
      if (err?.indexOf("connected") > 0) {
        NotificationManager.error('You are already registered with this email, kindly proceed with login', 'Already registered');
      } else {
        NotificationManager.error('Sign up Failed', 'Please try again');
      }
    }
  }





  return (
    <Layout sectionId="SignUpSection">
      <NavBar />
      <div id="banner-parent">
        <div className="banner-text">
          <h1> <span className='welcome'>Welcome</span> to <span className='dramatini'>DramaTini</span> <br />
          Sign Up </h1>
        </div>
      </div>
      <div id="sign-up-parent-box">
        <LoadingOverlay
          active={isSubmitting}
          spinner
          text='Please wait...'
        >
          <Row className="parent-row">
            <Col md='7'>
              <div className="normal-sign-up">
                <h6 className='__text__'><span>Sign Up</span></h6>

                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => {
                    doTryRegistration(values);
                    actions.setSubmitting(false);
                  }}
                >
                  {props => <SignUpForm {...props} user={currentUser} />}
                </Formik>
              </div>

              <div className="social-login">
                <h6 className='__text__'><span>OR</span></h6>
                <div className="social-btns">
                  <SocialButton
                    provider='facebook'
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    onLoginSuccess={handleSocialRegistration}
                    onLoginFailure={handleSocialRegistrationFailure}
                    className='facebook'
                  >
                    {SHARED_ICONS?.GrFacebookOption} Sign Up with Facebook
                  </SocialButton>
                  <SocialButton
                    provider='google'
                    appId={process.env.REACT_APP_GOOGLE_APP_ID}
                    onLoginSuccess={handleSocialRegistration}
                    onLoginFailure={handleSocialRegistrationFailure}
                    className='google'
                  >
                    {SHARED_ICONS?.GrGooglePlus} Sign Up with Google
                  </SocialButton>
                </div>
              </div>
            </Col>

            <Col md='5' className='sign-up-image'>
              {/* <img src={LOGOS.site_logo} alt="Logo" /> */}
            </Col>
          </Row>
        </LoadingOverlay>
      </div>
    </Layout>
  );
}

export default SignUp;
