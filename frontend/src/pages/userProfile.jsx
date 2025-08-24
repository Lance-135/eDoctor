// React User Profile Page
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken } from '../authUtils';
import use_axios from '../requests';

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Fetch user data on component mount
    useEffect(() => {
        const access_token = getAccessToken()
        if (access_token == null){
            alert("not not found")
        }
        else {
            use_axios.get("/user/profile/").then((res)=>{
            setUserData(res.data.user)
            setLoading(false)
        })
        }
    }, []);

    return (<div className=''>

    </div>
    );
};

export default UserProfile;
