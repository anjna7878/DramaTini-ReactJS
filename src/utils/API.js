var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
  /* other custom settings */
});

module.exports = axiosInstance;






// used in some another component 
// const handleAccomodationTypes = async () => {
//     const setDataAcc = [];

//     const result = await API.get(`/api/getaccomodationtype`);
//     if (result.data.status == 200) {
//       for (var i = 0; i < result.data.accomodationTypes.length; i++) {
//         setDataAcc[i] = { name: result.data.accomodationTypes[i]['type'], 'id': result.data.accomodationTypes[i]['id'] }
//       }
//       setaccomodationTypes(setDataAcc);
//     }
//   };
