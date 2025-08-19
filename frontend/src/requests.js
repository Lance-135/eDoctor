import axios from "axios";

async function post_request(url, formdata, access_token, refresh_token){
    const response = await axios.post(url, formdata, {
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })

    if (response.status == 401){
        const access_token = await axios.post()
    }
}