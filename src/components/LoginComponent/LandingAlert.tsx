import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useApp } from "../../Contexts/Context";
import "./LandingAlertComponent.css";

interface AlertComponentProps { }

const AlertComponent: React.FC<AlertComponentProps> = () => {
    const { alert, setAlert } = useApp();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        if (alert) {
            timer = setTimeout(() => {
                setAlert(null);
            }, alert.duration);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [alert, setAlert]);

    const handleClose = () => {
        setAlert(null);
    };

    return (
        alert && (
            <div
                className={`alert-container ${alert.variant === "success" ? "success" : "error"
                    }`}
            >
                <div className="alert-content">
                    <div>
                        <h3 className="alert-title">{alert.title}</h3>
                        <p className="alert-message">{alert.message}</p>
                    </div>
                    <button className="alert-close-btn" onClick={handleClose}>
                        <FaTimes />
                    </button>
                </div>
            </div>
        )
    );
};

export default AlertComponent;