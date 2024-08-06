import React, { useEffect, useState } from 'react';
import './App.css';
import FirstSection from './components/FirstSection';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar';
import store from './store/store';
import { ensureDBInitialized } from './store/indexedDB';
import Loader from './components/Loader';

function App() {
  const [isDBInitialized, setIsDBInitialized] = useState(false);

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
      <Provider store={store}>
        <NavBar />
        <FirstSection />
      </Provider>
    </React.Fragment>
  );
}

export default App;