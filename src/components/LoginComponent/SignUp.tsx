import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../Contexts/Context";
import "./Signup.css";

interface InitialValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
  cpassword: string;
  otp: string;
}

const initialValues: InitialValues = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  cpassword: "",
  otp: "",
};

const baseValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[^0-9]*$/, "Name must not contain numeric characters")
    .min(3, "Name should be minimum of 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must contain at least one letter, one number, and one special character, and be at least 6 characters long"
    ),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const otpValidationSchema = baseValidationSchema.shape({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const SignUp = () => {
  const { isLogin, setAlert } = useApp();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpExpiration, setOtpExpiration] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const sendOTP = async (values: InitialValues) => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/auth/send-otp",
        "https://dnd-back.vercel.app/api/auth/send-otp",
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
        setOtpSent(true);
        setOtpExpiration(json.expirationTime);
        setAlert({
          title: "OTP Sent",
          message: "Please check your email for the OTP. Valid for 1 minute.",
          variant: "success",
          duration: 10000,
        });
      } else {
        setAlert({
          title: "OTP Sending Failed",
          message: json.error,
          variant: "error",
          duration: 1000,
        });
      }
    } catch (error) {
      setAlert({
        title: "An error occurred",
        message: "Please try again later.",
        variant: "error",
        duration: 1000,
      });
      console.error("An error occurred:", error);
    }
  };

  const verifyOTP = async (values: InitialValues) => {
    try {
      const response = await fetch(
        // "http://localhost:5000/api/auth/verify-otp",
        "https://dnd-back.vercel.app/api/auth/verify-otp",
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
        navigate("/signin");
        setAlert({
          title: "You have successfully Signed up!",
          message: "Please login to continue",
          variant: "success",
          duration: 1000,
        });
      } else {
        setAlert({
          title: "Sign up Failed",
          message: json.error,
          variant: "error",
          duration: 1000,
        });
      }
    } catch (error) {
      setAlert({
        title: "An error occurred",
        message: "Please try again later.",
        variant: "error",
        duration: 1000,
      });
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (otpExpiration) {
      timer = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, otpExpiration - now);
        setTimeLeft(Math.ceil(remaining / 1000));
        if (remaining <= 0) {
          clearInterval(timer);
          setOtpSent(false);
          setAlert({
            title: "OTP Expired",
            message: "Please request a new OTP",
            variant: "warning",
            duration: 1000,
          });
          navigate("/signup");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpExpiration, setAlert, navigate]);

  return (
    <React.Fragment>
      {!isLogin && (
        <section className="signupPage" id="signup">
          <header className="signupPageHeader">
            <h2>Let's start the journey</h2>
          </header>
          <Formik
            initialValues={initialValues}
            validationSchema={otpSent ? otpValidationSchema : baseValidationSchema}
            onSubmit={otpSent ? verifyOTP : sendOTP}
            enableReinitialize
          >
            {(formik) => (
              <Form className="signupForm">
                {!otpSent && (
                  <>
                    <div>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.touched.name && formik.errors.name
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="error">{formik.errors.name}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.touched.email && formik.errors.email
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="error">{formik.errors.email}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="mobile">Mobile</label>
                      <input
                        type="tel"
                        name="mobile"
                        autoComplete="mobile tel"
                        value={formik.values.mobile}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.touched.mobile && formik.errors.mobile
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <div className="error">{formik.errors.mobile}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.touched.password && formik.errors.password
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cpassword">Confirm Password</label>
                      <input
                        type="password"
                        name="cpassword"
                        autoComplete="new-password"
                        value={formik.values.cpassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.touched.cpassword && formik.errors.cpassword
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.touched.cpassword && formik.errors.cpassword && (
                        <div className="error">{formik.errors.cpassword}</div>
                      )}
                    </div>
                  </>
                )}
                {otpSent && (
                  <>
                    <div>
                      <label htmlFor="otp">Enter OTP</label>
                      <input
                        type="text"
                        name="otp"
                        autoComplete="one-time-code"
                        value={formik.values.otp}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.touched.otp && formik.errors.otp
                            ? "input-error"
                            : ""
                        }
                      />
                      {formik.touched.otp && formik.errors.otp && (
                        <div className="error">{formik.errors.otp}</div>
                      )}
                    </div>
                    <div className="otp-timer">Time remaining: {timeLeft} seconds</div>
                  </>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {!formik.isSubmitting
                      ? otpSent
                        ? "Verify OTP"
                        : "Send OTP"
                      : otpSent
                        ? "Verifying..."
                        : "Sending OTP..."}
                  </button>
                </div>
                <div>
                  <Link to="/signin">Already have an account? Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      )}
    </React.Fragment>
  );
};

export default SignUp;