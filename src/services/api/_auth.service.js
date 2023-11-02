import axios from "axios";

const _authorizationHeaders = () => ({
  // Authorization: store.state.login.authToken ? store.state.login.authToken : "",
  "Content-Type": "application/json"
});


const handleError = err => {
  console.log(`Api call error in services -> request.js : `, err);
  return err
};

// user Login
const tryLogin = async (data, headers = _authorizationHeaders()) => {
  try {
    const res = await axios({
      // url: `https://cors-anywhere.herokuapp.com/https://yaalk.com/api/login`,
      url: `${process.env.REACT_APP_API_URL}/sign_in`,
      method: "POST",
      headers: Object.assign({}, headers),
      data
    });
    return res;
  } catch (error) {
    return (handleError(error.response.data));
  }
};



// user Login
const tryRegistration = async (data, headers = _authorizationHeaders()) => {
  try {
    const res = await axios({
      // url: `https://cors-anywhere.herokuapp.com/https://yaalk.com/api/login`,
      url: `${process.env.REACT_APP_API_URL}/sign_up`,
      method: "POST",
      headers: Object.assign({}, headers),
      data
    });
    return res;
  } catch (error) {
    return (handleError(error.response.data));
  }
};


const trySocialRegistration = async (data, headers = _authorizationHeaders()) => {
  if (data.sign_up_type === 'facebook') {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/facebook/sign-up`,
        method: "POST",
        headers: Object.assign({}, headers),
        data
      });
      return res;
    } catch (error) {
      handleError(error);
    }
  } else {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/google/sign-up`,
        method: "POST",
        headers: Object.assign({}, headers),
        data
      });
      return res;
    } catch (error) {
      return (handleError(error.response.data));
    }
  }
};


const trySocialLogin = async (data, headers = _authorizationHeaders()) => {
  if (data.sign_up_type === 'facebook') {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/facebook/sign-in`,
        method: "POST",
        headers: Object.assign({}, headers),
        data
      });
      return res;
    } catch (error) {
      return (handleError(error.response.data));
    }
  } else {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/google/sign-in`,
        method: "POST",
        headers: Object.assign({}, headers),
        data
      });
      return res;
    } catch (error) {
      return (handleError(error.response.data));
    }
  }
};


// change Password
const changePassword = async (user, data) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };
  console.log('DATA', data);
  const body = { "password": data?.password, "new_password": data?.new_password }
  console.log('body', body);

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/change_password`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};

// forgot password 
const sendPasswordResetLink = async (data) => {
  const options = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, data, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};

// reset password 
const resetPassword = async (token, user_id, data) => {
  const options = { headers: { "Content-Type": "application/json" } };
  const body = {
    token,
     user_id,
    password: data?.new_password,
  }

  console.log(body);
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};


// user logout
const doLogout = () => {
  localStorage.removeItem("user");
};

export const _authServices = {
  tryLogin, trySocialLogin, tryRegistration, trySocialRegistration, changePassword, sendPasswordResetLink,
  doLogout, resetPassword
};
