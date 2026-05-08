import axios, { Axios } from 'axios'


const axiosClient = axios.create({
    //baseURL: `${import.meta.VITE_BACKEND_URL}/api`
    baseURL: "http://127.0.0.1:8000",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    //withCredentials: true, // important if using Laravel Sanctum
})

axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})


axiosClient.interceptors.response.use(
    (response) =>{
      return response;
    }, 
    (error) =>{
      /*try{
        const { response } = error;
        //if (error.response.status === 401){
        if (response && response.status == 401){
            localStorage.removeItem('ACCESS_TOKEN');
        }
      }catch(error){
          console.error(error);
          
      }*/

      const { response } = error;
      //if (error.response.status === 401){
      if (response && response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN');
      }
    
    throw error;
        

})

/*axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code
      if (error.response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }

      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error("No response from server:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);
*/




export default axiosClient;