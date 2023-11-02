import { authConstants } from "../_constants";

const initialState = {
  business: null,
  isBusinessCreated: false,
  isProcessing: false,
  error: ""
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.BUSINESS_CREATING:
      return {
        isProcessing: true,
        isBusinessCreated: false,
        error: null
      };
    case authConstants.BUSINESS_CREATED:
      return {
        ...state,
        business: action.businessData,
        isBusinessCreated: true,
        isProcessing: false,
        error: null
      };
    case authConstants.BUSINESS_CREATING_ERROR:
      return {
        ...state,
        business: "",
        isBusinessCreated: false,
        // error: action.payload.error,
        isProcessing: false
      };

    // =======================registration========================
   
    // PROCESSING
    case authConstants.BUSINESS_PROCESSING:
      return {
        ...state,
        isProcessing: true
      };
    case authConstants.BUSINESS_PROCESSING_DONE:
      return {
        ...state,
        isProcessing: false
      };

    
    default:
      return state;
  }
}
