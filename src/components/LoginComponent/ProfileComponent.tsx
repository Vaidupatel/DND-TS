import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../Contexts/Context";
import { FaUser, FaEnvelope, FaPhone, FaSignOutAlt } from "react-icons/fa";
import "./ProfileComponent.css";


const Profile = () => {
    const navigate = useNavigate();
    const { user, logout, setAlert } = useApp();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        setAlert({
            title: "Logged Out",
            message: "You have been successfully logged out",
            variant: "success",
            duration: 1000,
        });
        navigate("/signin");
    };

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">User Profile</h1>
                <div className="profile-avatar">
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="profile-info">
                    <div className="info-item">
                        <FaUser className="icon" />
                        <div>
                            <p className="info-label">Name</p>
                            <p className="info-value">{user.name}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <FaEnvelope className="icon" />
                        <div>
                            <p className="info-label">Email</p>
                            <p className="info-value">{user.email}</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <FaPhone className="icon" />
                        <div>
                            <p className="info-label">Mobile</p>
                            <p className="info-value">{user.mobile}</p>
                        </div>
                    </div>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    <FaSignOutAlt className="icon" /> Log out
                </button>
            </div>
        </div>
    );
};

export default Profile;