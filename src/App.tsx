import './App.css'
import FirstSection from './components/FirstSection'
import { Provider } from 'react-redux';
import NavBar from './components/NavBar'
import store from './store/store';
import Test from './components/Test';

function App() {

  return (
    <>
      <Provider store={store}>
        <NavBar />
        <FirstSection />
        {/* <Test /> */}
      </Provider>
    </>
  )
}

export default App
