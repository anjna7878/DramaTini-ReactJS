import { authConstants } from "../_constants";

const initialState = {
  user: null,
  isAuthenticated: false,
  isProcessing: false,
  error: ""
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.USER_LOGIN_BEGIN:
      return {
        // ...state,
        isProcessing: true,
        isAuthenticated: false,
        error: null
      };
    case authConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.userData,
        isAuthenticated: true,
        isProcessing: false,
        error: null
      };
    case authConstants.USER_LOGIN_ERROR:
      return {
        ...state,
        user: "",
        isAuthenticated: false,
        // error: action.payload.error,
        isProcessing: false
      };

    // =======================registration========================
    case authConstants.USER_REGISTRATION_BEGIN:
      return {
        ...state,
        isProcessing: true,
        isAuthenticated: false,
        error: null
      };
    case authConstants.USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.userData,
        isAuthenticated: true,
        isProcessing: false,
        error: null
      };
    case authConstants.USER_REGISTRATION_ERROR:
      return {
        ...state,
        user: "",
        isAuthenticated: false,
        // error: action.payload.error,
        isProcessing: false
      };


    // PROCESSING
    case authConstants.USER_PROCESSING:
      return {
        ...state,
        isProcessing: true
      };
    case authConstants.USER_PROCESSING_DONE:
      return {
        ...state,
        isProcessing: false
      };

    case authConstants.USER_LOGOUT:
      return {
        state: initialState,
        user: null,
        isAuthenticated: false,
        isProcessing: false,
        error: null
      };

    default:
      return state;
  }
}
