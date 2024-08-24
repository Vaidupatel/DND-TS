import React, { useEffect, useState } from 'react';
import { ensureDBInitialized } from './store/indexedDB';
import { Route, Routes, useLocation } from 'react-router-dom';
import FirstSection from './components/FirstSection';
import LandingNavbar from './components/LoginComponent/LandingNavbar'
import Loader from './components/Loader';
import Hero from './components/LoginComponent/LandingHero';
import SignUp from './components/LoginComponent/SignUp';
import Login from './components/LoginComponent/LandingLogin';
import PrivateRoute from './components/LoginComponent/PrivateRoute';
import ProfileComponent from './components/LoginComponent/ProfileComponent';
import About from './components/LoginComponent/LandingAbout';
import LandingDocumentation from './components/LoginComponent/LandingDocumentation';
import LandingFooter from './components/LoginComponent/LandingFooter';
import GoToTop from './components/LoginComponent/LandingGoToTop';
import AlertComponent from './components/LoginComponent/LandingAlert';
import PageNotFound from './components/LoginComponent/LandingPageNotFound';
import './App.css';

function App() {
  const [isDBInitialized, setIsDBInitialized] = useState(false);

  const location = useLocation();
  const hideNavbar = location.pathname === "/editor";

  useEffect(() => {
    ensureDBInitialized()
      .then(() => {
        setIsDBInitialized(true);
      })
      .catch((error) => {
        console.error('Failed to initialize IndexedDB:', error);
        setIsDBInitialized(true);
      });
  }, []);
  if (!isDBInitialized) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!hideNavbar && <LandingNavbar />}
      <AlertComponent />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/documentation" element={<LandingDocumentation />} />
        <Route path="/profile" element={<PrivateRoute> <ProfileComponent /> </PrivateRoute>} />
        <Route path="/editor" element={<PrivateRoute> <FirstSection /> </PrivateRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GoToTop />

      {!hideNavbar && < LandingFooter />}
    </React.Fragment>
  );
}

export default App;