// React User Profile Page
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from '../authUtils';
import use_axios from '../requests';
import AuthContext from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingCircle from '../components/loadingCircle';

const UserProfile = () => {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Fetch user data on component mount
    useEffect(() => {
        const access_token = getAccessToken()
        if (access_token == null){
            logout()
            navigate('/home')
        }
        else {
            use_axios.get("/user/profile/").then((res)=>{
            setUserData(res.data.user)
            setLoading(false)
            console.log(res.data.user['full_name'])
        })
        }
    }, []);

    return (<div className='container justify-center flex h-screen items-center'>
        <LoadingCircle color='border-t-blue-500'/>
    </div>
    );
};

export default UserProfile;
