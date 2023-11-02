
import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";


import SHARED_ICONS from "../../themes/shared_icon";
import LOGOS from "../../themes/logo";
import SocialButton from '../../components/elements/SocialButton'
import { LoginForm } from "./LoginForm";
import Layout from "../../components/global/Layout";
import NavBar from "../../components/global/NavBar";
import { doSocialLogin } from "../../store/_actions";
import { login } from "../../store/_actions";
import { logout } from "../../store/_actions";

import _VALIDATE from '../../helpers/YupValidationSchema';




const validationSchema = Yup.object().shape({
  email: _VALIDATE?.registered_email,
  password: _VALIDATE?.password,
  agreeTerms: Yup.bool()
});




function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const initialValues = { email: '', password: "", agreeTerms: true };

  React.useEffect(() => {
    if (!currentUser?.isAuthenticated) {
      dispatch(logout());
    }
  }, []);

  const doTryLogin = values => {
    dispatch(login(values)).then(res => {
      handleLoginSuccess(res);
    })
  };

  

  const handleSocialLogin = (user) => {
    console.log('====================================');
    console.log('SOCIAL_USER_LOGIN::',user);
    console.log('====================================');
    const body = {
      facebook_id: (user?._provider === 'facebook') ? user?._profile?.id : '',
      google_id: (user?._provider === 'google') ? user?._profile?.id : '',
      access_token: user?._token?.accessToken,
      email: user?._profile?.email,
      sign_up_type: user?._provider
    }
    setSubmitting(true);

    dispatch(doSocialLogin(body)).then(res => {
      setSubmitting(false);
      console.log(res);
      handleLoginSuccess(res);
    })
      .catch(err => {
        setSubmitting(false);
      })
  }

  const handleSocialLoginFailure = (err) => {

    console.log('====================================');
    console.log('SOCIAL_USER_LOGIN_FAIL::',err);
    console.log('====================================');
    console.log('type_err::', typeof (err));
    if (typeof (err) != 'object') {
      // if (err?.indexOf("connected") > 0) {
      //   NotificationManager.error('You are already registered with this email, kindly proceed with login', 'Already registered');
      // } else {
      //   NotificationManager.error('Sign up Failed', 'Please try again');
      // }
    }
  }


  const handleLoginSuccess = res => {
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


  return (
    <Layout sectionId="SignInSection">
      <NavBar />

      <div id="banner-parent">
        <div className="banner-text">
          <h1> <span className='welcome'>Welcome</span> to <span className='dramatini'>DramaTini</span> <br />
          It’s Great To Meet You Again. </h1>
          <p>Sign-in as a <span className='pink-text'>Tini member</span> !!</p>
        </div>
      </div>

      <div id="sign-in-parent-box">
        <LoadingOverlay
          active={isSubmitting}
          spinner
          text='Please wait...'
        >
          <Row>
            <Col md='5' className='social-login'>
              <img src={LOGOS.site_logo} alt="Logo" className="app-logo" />
              <h6 className='__text__'><span>OR</span></h6>
              <div className="social-btns">
                <SocialButton
                  provider='facebook'
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure} className='facebook'
                >
                  {SHARED_ICONS?.GrFacebookOption} Login with Facebook
                </SocialButton>


                <SocialButton
                  provider='google'
                  appId={process.env.REACT_APP_GOOGLE_APP_ID}
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                  className='google'
                >
                  {SHARED_ICONS?.GrGooglePlus} Login with Google
                </SocialButton>
              </div>
            </Col>
            <Col md='7' className='normal-login'>
              <h6 className='__text__'><span>Sign In</span></h6>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  doTryLogin(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => <LoginForm {...props} user={currentUser} />}
              </Formik>
            </Col>
          </Row>
        </LoadingOverlay>
      </div>
    </Layout>
  );
}

export default SignIn;
