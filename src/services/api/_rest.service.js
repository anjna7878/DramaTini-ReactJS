import axios from "axios";




// const handleCountrys = async () => {
//   const result = await API.get(`/api/getcountry`);
//   if (result.data.status == 200) {
//     setCountrys(result.data.countrys);
//   }
// };

const deleteMyself = async (user,_id) => {
  console.log('====================================');
  console.log(user.token);
  console.log(_id);
  console.log('====================================');


  const options = { headers: { 'Authorization': `Bearer ${user.token}` } };
  const body = {}
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/delete_user/${_id}`,body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};

// console.log(rootStore);
// console.log(rootStore.store.getState());
// console.log(rootStore.store.getState());


// const _authorizationHeaders = () => ({
//   Authorization: rootStore.store.getState()?.user.token ? `Bearer ${rootStore.store.getState()?.user.token}` : "",
//   "Content-Type": "application/json"
// });

const handleError = err => {
  console.log(`Api call error in services -> request.js : `, err);
  return err
};

// const propertyListURL = `${API_URL}/place/business/type.json`;

const getBusinessProfile = async (token) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};

const updateProfile = async (token, body) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/profile/update`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


const createCoupon = async (token, body) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/coupon_create`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};



const getBusinessCreatedCoupons = async (token) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/coupons`, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};



const createBusiness = async (token, body) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/business_create`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};


const updateBusiness = async (token, _id, body) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_business/${_id}`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};



// create theater
const createTheater = async (user, body) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/theater_create`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};

// modify theater
const modifyTheater = async (user, theater_id, body) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_theater/${theater_id}`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// create event
const createEvent = async (user, body) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  const newBody = {
    user_id: user._id,
    event_name: body.event_name,
    event_description: body.event_description,
    organizer_name: body.event_contact_person,
    organizer_phone: body.event_organizer_no,
    guest_capacity: body.event_capacity,

    event_start_date: body.event_start_date,
    event_end_date: body.event_end_date,
    event_start_time: body.event_start_time,
    event_end_time: body.event_end_time,
  }

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/event_create`, newBody, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// modify event
const modifyEvent = async (user, event_id, body) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  const newBody = {
    user_id: user._id,
    event_name: body.event_name,
    event_description: body.event_description,
    organizer_name: body.event_contact_person,
    organizer_phone: body.event_organizer_no,
    guest_capacity: body.event_capacity,
    event_start_date: body.event_start_date,
    event_end_date: body.event_end_date,
    event_start_time: body.event_start_time,
    event_end_time: body.event_end_time,

  }
  console.log(body);
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/update_event/${event_id}`, newBody, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// event list
const getEventList = async (token) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// get Tini FollowList
const getTiniFollowList = async (token) => {
  const options = { headers: { 'Authorization': `Bearer ${token}` } };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/`, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// update profile pic
const updateProfilePic = async (user, body) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/profile/image_upload`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// search businesses and theaters
const searchBusinessesAndTheaters = async (user, body) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  const newBody = {
    latitude: body?.latitude,
    longitude: body?.longitude,
    distance: '100'
  }
  console.log(newBody);
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/search`, newBody, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


// follow businesses and theaters
const followBusinessOrTheater = async (user, type, id) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };
  const URL = (type === 'business') ? 'follow_business' : 'follow_theater';
  const data = (type === 'business') ? { business_id: id } : { theater_id: id };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/${URL}`, data, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};



//get follow list
const fetchFollowList = async (user) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tini_follow_list`, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};


//unfollow list
const doUnFollowTheaterOrBusiness = async (user, type, id) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };
  const URL = (type === 'business') ? 'unfollow_business' : 'unfollow_theater';

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/${URL}/${id}`, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};

// share business with
const shareBusinessWith = async (user, bis_id, data) => {
  const options = { headers: { 'Authorization': `Bearer ${user?.token}` } };

  const body = {
    business_id: bis_id,
    email: data.email
  }
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/share_business`, body, options);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));
  }
};




export const _restServices = {deleteMyself,
  getBusinessProfile, updateProfile, createCoupon, getBusinessCreatedCoupons, createBusiness, updateBusiness,
  createTheater, modifyTheater, createEvent, modifyEvent, getEventList, getTiniFollowList, updateProfilePic, searchBusinessesAndTheaters,
  followBusinessOrTheater, fetchFollowList, doUnFollowTheaterOrBusiness, shareBusinessWith,
};
