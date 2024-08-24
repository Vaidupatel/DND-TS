import React from "react";
import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import PrinceImage from "../../asset/Prince_Gondaliya.jpg";
import NirjalImage from "../../asset/Nirjal_Ambaliya.jpg";
import VaidikImage from "../../asset/Vaidik_Ghelani.jpg";
import Team from "../../asset/Team.jpg";
import "./LandingAbout.css";

interface FormValues {
    name: string;
    email: string;
    message: string;
    subject: "general" | "support" | "feedback";
}

const initialValues: FormValues = {
    name: "",
    email: "",
    message: "",
    subject: "general",
};

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    message: Yup.string().required("Message is required"),
    subject: Yup.string()
        .oneOf(["general", "support", "feedback"], "Invalid subject")
        .required("Subject is required"),
});

const About: React.FC = () => {
    const onSubmit = async (values: FormValues, formik: FormikProps<FormValues>) => {
        console.log(values);
    };

    return (
        <section className="about" id="about">
            <div className="about-container">
                <section className="hero-section">
                    <h1>Welcome to Farm IT Web Studio</h1>
                    <p>Empowering Your Web Presence</p>
                </section>


                <section className="mission-vision">
                    <h2>Mission and Vision</h2>
                    <div className="mission-content">
                        <div className="mission-card">
                            <h3>Mission</h3>
                            <p>
                                To provide intuitive, powerful, and accessible web development
                                tools for all.
                            </p>
                        </div>
                        <div className="mission-card">
                            <h3>Vision</h3>
                            <p>
                                A world where everyone can bring their digital ideas to life,
                                regardless of technical background.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="core-values">
                    <h2>Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <div className="value-icon">🚀</div>
                            <h3>Innovation</h3>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">👥</div>
                            <h3>User-centric design</h3>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">🌐</div>
                            <h3>Accessibility</h3>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">💎</div>
                            <h3>Quality</h3>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">📈</div>
                            <h3>Continuous improvement</h3>
                        </div>
                    </div>
                </section>

                <section className="team-introduction">
                    <h2>Faces behind Web Studio</h2>
                    <div className="team-members">

                        <div className="team-member">
                            <img src={VaidikImage} alt="Vaidik Ghelani" />
                            <h3>Ghelani Vaidik</h3>
                            <p>Founder & CEO</p>
                        </div>

                    </div>
                </section>

                <section className="unique-selling-points">
                    <h2>Why Choose Web Studio Sites?</h2>
                    <div className="usp-grid">
                        <div className="usp-item">
                            <h3>User-friendly Interface</h3>
                            <p>
                                Intuitive drag-and-drop functionality for effortless design.
                            </p>
                        </div>
                        <div className="usp-item">
                            <h3>Customizable Templates</h3>
                            <p>
                                A wide range of professionally designed templates to start from.
                            </p>
                        </div>
                        <div className="usp-item">
                            <h3>Real-time Collaboration</h3>
                            <p>Work together seamlessly with your team in real-time.</p>
                        </div>
                        <div className="usp-item">
                            <h3>SEO-friendly</h3>
                            <p>Built-in SEO tools to boost your online visibility.</p>
                        </div>
                    </div>
                </section>

                <section className="testimonials">
                    <h2>What Our Users Say</h2>
                    <div className="testimonial-carousel">
                        <div className="testimonial-item">
                            <p>
                                "Web Studio transformed our online presence. It's incredibly
                                easy to use!"
                            </p>
                            <h4>- Sarah J., Small Business Owner</h4>
                        </div>
                    </div>
                </section>

                <section className="future-plans">
                    <h2>The Future is Bright</h2>
                    <p>
                        We're constantly innovating to bring you the latest in web
                        development technology. Stay tuned for exciting new features that
                        will revolutionize your web creation experience!
                    </p>
                </section>

                <section className="contact-information">
                    <h2>Get in Touch</h2>
                    <div className="contact-wrapper">
                        <div className="contact-form-container">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {(formik) => (
                                    <Form className="contact-form">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                name="name"
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

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                name="email"
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

                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formik.values.subject}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                className={
                                                    formik.touched.subject && formik.errors.subject
                                                        ? "input-error"
                                                        : ""
                                                }
                                            >
                                                <option value="general">General Inquiry</option>
                                                <option value="support">Support</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                            {formik.touched.subject && formik.errors.subject && (
                                                <div className="error">{formik.errors.subject}</div>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea
                                                name="message"
                                                value={formik.values.message}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                className={
                                                    formik.touched.message && formik.errors.message
                                                        ? "input-error"
                                                        : ""
                                                }
                                            />
                                            {formik.touched.message && formik.errors.message && (
                                                <div className="error">{formik.errors.message}</div>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={!formik.isValid || formik.isSubmitting}
                                            >
                                                {!formik.isSubmitting ? "Send Message" : "Sending..."}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        <div className="contact-info">
                            <div className="info-item">
                                <div className="headingForContact">
                                    <h3>Contact Details</h3>
                                </div>
                                <div className="informationContact">
                                    <p>
                                        Email:
                                        <a href="mailto:support.webstudio@Farmit.com">
                                            support.webstudio@Farmit.com
                                        </a>
                                    </p>
                                    <p>+91 7201927081</p>
                                    <p>506, Zion Prime,Nr.Copper Stone, Thaltej - Shilaj Road,Thaltej, Ahmedabad, GJ, IN </p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="headingForContact">
                                    <h3>Business Hours</h3>
                                </div>
                                <div className="informationContact">
                                    <p>Monday - Friday: 9 AM - 6 PM</p>
                                    <p>Expected response time: Within 24 hours</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="headingForContact">
                                    <h3>Connect With Us</h3>
                                </div>
                                <div className="informationContact">
                                    <div className="social-icons">
                                        <a
                                            href="https://facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaFacebookF />
                                        </a>
                                        <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaTwitter />
                                        </a>
                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaInstagram />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="map">
                    <h2>Our Location</h2>
                    <iframe
                        title="Farm IT Web Studios ,Ahmedabad Gujarat"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.6786175040787!2d72.49231292166213!3d23.05145857789617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b6199ef2577%3A0x32ec5eca5fb17d9f!2sZion%20prime!5e0!3m2!1sen!2sin!4v1724304111467!5m2!1sen!2sin" width="600"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>

            </div>
        </section>
    );
};

export default About;