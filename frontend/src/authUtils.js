
const getAccessToken = ()=>{
    return localStorage.getItem('access_token')
}

const getRefreshToken = ()=>{
    return localStorage.getItem("refresh_token")
} 

const setAccessToken = (new_token)=>{
    localStorage.setItem("access_token", new_token)
}

const setRefreshToken = (new_token)=>{
    localStorage.setItem("refresh_token", new_token)
}


export {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken}