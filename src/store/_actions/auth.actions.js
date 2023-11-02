import { authConstants } from "../_constants";
import { _authServices } from "../../services/api";
import { NotificationManager } from 'react-notifications';

export const login = (body) => {
  return dispatch => {
    dispatch(initializeLogin());

    return new Promise((resolve, reject) => {
      _authServices.tryLogin(body).then(
        res => {
          console.log('LOGIN:', res);
          if (res['status'] === 200) {
            if (res['data']['status'] === 1) {
              dispatch(loginSuccess(res['data']['data']));
            } else {
              dispatch(loginFailed(res['data']['error']['error']['message']));
              NotificationManager.error('Login Failed', res['data']['error']['error']['message']);
            }
          }
          return resolve(res);
        },
        error => {
          dispatch(loginFailed(error));
          return reject(error);
        }
      );
    });
  };

  function initializeLogin() {
    return { type: authConstants.USER_LOGIN_BEGIN };
  }
  function loginSuccess(userData) {
    // return { type: authConstants.USER_LOGIN_SUCCESS, payload: { userData: userData } };
    return { type: authConstants.USER_LOGIN_SUCCESS, userData };
  }
  function loginFailed(error) {
    return { type: authConstants.USER_LOGIN_ERROR, error };
  }
}


export const doSocialLogin = (body) => {
  return (dispatch) => {
    // dispatch(initializeLogin());
    return new Promise((resolve, reject) => {
      _authServices.trySocialLogin(body).then(res => {
        console.log('result::', res);
        if (res['status'] === 200) {
          if (res['data']['status'] === 1) {
            dispatch(loginSuccess(res['data']['data']));
          } else {
            NotificationManager.error(`${res['data']['error']['error']['message']}`, 'Login Failed',);
            dispatch(loginFailed(res['data']['error']['error']['message']));
          }
        }
        return resolve(res);
        // or return resolve(dispatch(receivedConfig(response)));
      },
        (error) => {
          dispatch(loginFailed(error));
          return reject(error);
          // or return reject(dispatch(registrationFailed(error)));
        }
      );
    });
  };

  // function initializeLogin() {
  //   return { type: authConstants.USER_LOGIN_BEGIN };
  // }
  function loginSuccess(userData) {
    // return { type: authConstants.USER_LOGIN_SUCCESS, payload: { userData: userData } };
    return { type: authConstants.USER_LOGIN_SUCCESS, userData };
  }
  function loginFailed(error) {
    return { type: authConstants.USER_LOGIN_ERROR, error };
  }
}



export const registration = (body) => {
  return dispatch => {
    dispatch(initializeRegistration());

    return new Promise((resolve, reject) => {
      _authServices.tryRegistration(body).then(
        res => {
          if (res['status'] === 200) {
            if (res['data']['status'] === 1) {
              dispatch(registrationSuccess(res['data']['data']));
            } else {
              NotificationManager.error('Registration Failed', res['data']['error']['error']['message']);
              dispatch(registrationFailed(res['data']['error']['error']['message']));
            }
          }
          return resolve(res);
        },
        error => {
          dispatch(registrationFailed(error));
          return reject(error);
        }
      );
    });

  };

  function initializeRegistration() {
    return { type: authConstants.USER_REGISTRATION_BEGIN };
  }
  function registrationSuccess(userData) {
    return { type: authConstants.USER_REGISTRATION_SUCCESS, userData };
  }
  function registrationFailed(error) {
    return { type: authConstants.USER_REGISTRATION_ERROR, error };
  }
}


export const doSocialRegistration = (body) => {
  return (dispatch) => {
    // dispatch(initializeRegistration());

    return new Promise((resolve, reject) => {
      _authServices.trySocialRegistration(body).then(res => {
        console.log('result::', res);
        if (res['status'] === 200) {
          if (res['data']['status'] === 1) {
            dispatch(registrationSuccess(res['data']['data']));
          } else {
            NotificationManager.error(`${res['data']['error']['error']['message']} Please try login with same email.`, 'Registration Failed',);
            dispatch(registrationFailed(res['data']['error']['error']['message']));
          }
        }
        return resolve(res);
        // or return resolve(dispatch(receivedConfig(response)));
      },
        (error) => {
          dispatch(registrationFailed(error));
          return reject(error);
          // or return reject(dispatch(registrationFailed(error)));
        }
      );
    });
  };

  // function initializeRegistration() {
  //   return { type: authConstants.USER_REGISTRATION_BEGIN };
  // }
  function registrationSuccess(userData) {
    return { type: authConstants.USER_REGISTRATION_SUCCESS, userData };
  }
  function registrationFailed(error) {
    return { type: authConstants.USER_REGISTRATION_ERROR, error };
  }
}





export const logout = () => (dispatch) => {
  _authServices.doLogout();
  dispatch({ type: authConstants.USER_LOGOUT });
};

