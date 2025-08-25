import axios from "axios";
import devconfig from "./config";
import { getAccessToken, getRefreshToken, setAccessToken, remove_tokens} from "./authUtils";


export const use_axios = axios.create({
    baseURL: devconfig.API_BASE_URL, 
    withCredentials: true
}
);

use_axios.interceptors.request.use(
    (config)=>{
        const access_token = getAccessToken()
        if (access_token){
            config.headers.Authorization = `Bearer ${access_token}`
        }
        return config
    }, 
    (error)=>Promise.reject(error)
);

use_axios.interceptors.response.use(
    (response) =>response, 
    async (error) =>{
        const original_request = error.config;
        if(error.response?.status == 401 && !original_request.retry){
            original_request.retry = true

            try {
                const refresh_token = getRefreshToken()
                const refresh_response = await axios.post(`${devconfig.API_BASE_URL}/auth/refresh/`, {refresh: refresh_token})
                const new_access_token = refresh_response.data.access
                setAccessToken(new_access_token)

                // now retry with the new access token 
                original_request.headers.Authorization = `Bearer ${new_access_token}`
                return use_axios(original_request)
            } catch (error) {
                console.error(error);
                remove_tokens()
                // window.location.href = '/home/'
            }
        }
        return Promise.reject(error)
    }
)

export default use_axios