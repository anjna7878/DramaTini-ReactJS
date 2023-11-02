import { businessConstants } from "../_constants";
import { _restServices } from "../../services/api";

export const businessCreation = (body) => {
  return dispatch => {
    dispatch({ type: businessConstants.BUSINESS_CREATING });

    _restServices.createBusiness().then(
      res => {
        console.log(res);
        // if (res['status'] === 200) {
        //   if (res['data']['status'] === 1) {
        //     dispatch(loginSuccess(res['data']['data']));
        //   } else {
        //     dispatch(loginFailed(res['data']['error']['error']['message']));
        //     NotificationManager.error('Login Failed', res['data']['error']['error']['message']);
        //   }
        // }
      },
      error => {
        // dispatch(loginFailed(error));
      }
    );
  };

  // function initializeLogin() {
  //   return { type: authConstants.USER_LOGIN_BEGIN };
  // }
  // function loginSuccess(userData) {
  //   // return { type: authConstants.USER_LOGIN_SUCCESS, payload: { userData: userData } };
  //   return { type: authConstants.USER_LOGIN_SUCCESS, userData };
  // }
  // function loginFailed(error) {
  //   return { type: authConstants.USER_LOGIN_ERROR, error };
  // }
}









