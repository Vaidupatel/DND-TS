import './App.css'
import FirstSection from './components/FirstSection'
import { Provider } from 'react-redux';
import NavBar from './components/NavBar'
import store from './store/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <NavBar />
        <FirstSection />
      </Provider>
    </>
  )
}

export default App
