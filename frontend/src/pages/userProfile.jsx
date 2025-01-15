// React User Profile Page
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Add your styling here

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [jwt_token , setJwt] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        token = localStorage.getItem("jwt_token")
        if (token == null){
            alert("not not found") // remove after testing the code 
        }
        else {
            setJwt(token)
        }

        axios.get("", ) 
            .then((response) => {
                setUserData(response.data);
                setFormData(response.data);
            })
            .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle profile picture upload
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    // Submit updates to the server
    const handleSave = () => {
        const updateData = new FormData();
        for (let key in formData) {
            updateData.append(key, formData[key]);
        }
        if (profilePicture) {
            updateData.append('profile_picture', profilePicture);
        }

        axios.put('', updateData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                setUserData(response.data);
                setIsEditing(false);
            })
            .catch((error) => console.error('Error updating user data:', error));
    };

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            {/* <div className="profile-picture">
                <img 
                    src={userData.profile_picture || 'default-avatar.png'} // Default image if none exists
                    alt="Profile"
                />
                {isEditing && (
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                )}
            </div> */}

            <div className="profile-details">
                <label>
                    User Name:
                    {isEditing ? (
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.user_name}</span>
                    )}
                </label>
                <label>
                    Email:
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.email}</span>
                    )}
                </label>
                {/* <label>
                    Bio:
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={formData.bio || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.bio}</span>
                    )}
                </label> */}
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
