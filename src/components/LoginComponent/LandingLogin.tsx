import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../Contexts/Context";
import * as Yup from "yup";

interface InitialValues {
    email: string;
    password: string;
    otp?: string;
    newPassword?: string;
}

const initialValues: InitialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
            "Password must contain at least one letter, one number, and one special character, and be at least 6 characters long"
        ),
});

const forgotPassSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

const resetPassSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required"),
    newPassword: Yup.string()
        .required("New password is required")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
            "Password must contain at least one letter, one number, and one special character, and be at least 6 characters long"
        ),
});

const Login = () => {
    const navigate = useNavigate();
    const { setAlert, user, login } = useApp();
    const [forgotPass, setForgotPass] = useState<boolean>(false);
    const [resetPass, setResetPass] = useState<boolean>(false);

    const sendOTP = async (values: { email: string }) => {
        try {
            const response = await fetch(
                // "http://localhost:5000/api/auth/forgot-password",
                "https://dnd-back.vercel.app/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const json = await response.json();
            if (json.success) {
                setAlert({
                    title: "OTP Sent",
                    message: "Please check your email for the OTP. Valid for 5 minutes.",
                    variant: "success",
                    duration: 5000,
                });
                setResetPass(true);
            } else {
                setAlert({
                    title: "OTP Sending Failed",
                    message: json.error,
                    variant: "error",
                    duration: 5000,
                });
            }
        } catch (error) {
            setAlert({
                title: "An error occurred",
                message: "Please try again later.",
                variant: "error",
                duration: 5000,
            });
            console.error("An error occurred:", error);
        }
    };

    const resetPassword = async (values: {
        email: string;
        otp: string;
        newPassword: string;
    }) => {
        try {
            const response = await fetch(
                // "http://localhost:5000/api/auth/reset-password",
                "https://dnd-back.vercel.app/api/auth/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const json = await response.json();
            if (json.success) {
                setAlert({
                    title: "Password Reset Successful",
                    message: "You can now log in with your new password.",
                    variant: "success",
                    duration: 5000,
                });
                setForgotPass(false);
                setResetPass(false);
            } else {
                setAlert({
                    title: "Password Reset Failed",
                    message: json.error,
                    variant: "error",
                    duration: 5000,
                });
            }
        } catch (error) {
            setAlert({
                title: "An error occurred",
                message: "Please try again later.",
                variant: "error",
                duration: 5000,
            });
            console.error("An error occurred:", error);
        }
    };

    const onSignin = async (values: { email: string; password: string }) => {
        try {
            const response = await fetch(
                // "http://localhost:5000/api/auth/login",
                "https://dnd-back.vercel.app/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const result = await response.json();
            if (result.success) {
                login(result.user);
                setAlert({
                    title: "You have successfully Signed in!",
                    message: "You are now logged in",
                    variant: "success",
                    duration: 1000,
                });
                navigate("/profile");
            } else {
                setAlert({
                    title: "Login Failed",
                    message: result.error,
                    variant: "error",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error("An error occurred during sign in:", error);
            setAlert({
                title: "An error occurred",
                message: "Please try again later.",
                variant: "error",
                duration: 1000,
            });
        }
    };

    return (
        <React.Fragment>
            {!user && (
                <section className="signupPage" id="signin">
                    <header className="signupPageHeader">
                        <h2>Welcome back! Sign in to get started</h2>
                    </header>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={
                            forgotPass
                                ? resetPass
                                    ? resetPassSchema
                                    : forgotPassSchema
                                : validationSchema
                        }
                        onSubmit={
                            forgotPass
                                ? resetPass
                                    ? resetPassword
                                    : sendOTP
                                : onSignin
                        }
                    >
                        {(formik) => (
                            <Form className="signupForm">
                                <Field name="email">
                                    {({ field, meta }: { field: any; meta: any }) => (
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                autoComplete="email"
                                                {...field}
                                                className={
                                                    meta.touched && meta.error ? "input-error" : ""
                                                }
                                            />
                                            <ErrorMessage name="email" component="div" className="error" />
                                        </div>
                                    )}
                                </Field>
                                {!forgotPass && (
                                    <Field name="password">
                                        {({ field, meta }: { field: any; meta: any }) => (
                                            <div>
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    autoComplete="new-password"
                                                    {...field}
                                                    className={
                                                        meta.touched && meta.error ? "input-error" : ""
                                                    }
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="error"
                                                />
                                            </div>
                                        )}
                                    </Field>
                                )}
                                {resetPass && (
                                    <>
                                        <Field name="otp">
                                            {({ field, meta }: { field: any; meta: any }) => (
                                                <div>
                                                    <label htmlFor="otp">OTP</label>
                                                    <input
                                                        type="text"
                                                        autoComplete="one-time-code"
                                                        {...field}
                                                        className={
                                                            meta.touched && meta.error ? "input-error" : ""
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        name="otp"
                                                        component="div"
                                                        className="error"
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="newPassword">
                                            {({ field, meta }: { field: any; meta: any }) => (
                                                <div>
                                                    <label htmlFor="newPassword">New Password</label>
                                                    <input
                                                        type="password"
                                                        autoComplete="new-password"
                                                        {...field}
                                                        className={
                                                            meta.touched && meta.error ? "input-error" : ""
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        name="newPassword"
                                                        component="div"
                                                        className="error"
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                    </>
                                )}
                                <div className="ForgotPasswordAndSingUp">
                                    {!forgotPass && (
                                        <>
                                            <div>
                                                <Link to="/signup">Don't have an account? Sign Up</Link>
                                            </div>
                                            <div>
                                                <Link onClick={() => setForgotPass(true)}>
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    {forgotPass && (
                                        <div>
                                            <Link
                                                onClick={() => {
                                                    setForgotPass(false);
                                                    setResetPass(false);
                                                }}
                                            >
                                                &larr; Go back to Login
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={!formik.isValid || formik.isSubmitting}
                                    >
                                        {formik.isSubmitting
                                            ? "Processing..."
                                            : forgotPass
                                                ? resetPass
                                                    ? "Reset Password"
                                                    : "Send OTP"
                                                : "Login"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </section>
            )}
        </React.Fragment>
    );
};

export default Login;