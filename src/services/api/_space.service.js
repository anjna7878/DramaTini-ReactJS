import axios from "axios";

const handleError = err => {
  console.log(`Api call error in services -> request.js : `, err);
  return err
};



const getGoogleSearchResults = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_GOOGLE_MAP_URL}/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};


const getGeoLocation = async (place_id) => {

  try {
    const res = await axios.get(`${process.env.REACT_APP_GOOGLE_MAP_URL}/geocode/json?place_id=${place_id}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`);
    return res.data;
  } catch (err) {
    return (handleError(err.response.data));

  }
};





export const _spaceServices = {
  getGoogleSearchResults, getGeoLocation
};
