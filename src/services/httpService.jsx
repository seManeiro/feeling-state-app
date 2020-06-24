import axios from 'axios'


  
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token; 
  } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  
  
  export default {
    setAuthToken,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
  };