import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import Header from './components/templates/headerAuth';
import Login from './components/authentification/login';
import Register from './components/authentification/register';
import Password from './components/authentification/password';
import HomePage from './components/homePage';
import Footer from '@components/templates/footer';
import { MdOutlineNightlight, MdOutlineLightMode } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

// CONTEXTS
import User from './contexts/userContext';

export default function App() {
  const authToken = Cookies.get('auth_token');

  // USECONTEXT
  const [user, setUser] = useState<object | null>(null);
  const contextValue = {
    user,
    setUser,
  };

  // LIGHT DARK MODE
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const appClass: string = isDarkMode ? 'dark-mode' : 'light-mode';
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const isDarkModeToString = (!isDarkMode).toString();
    Cookies.set('dark-mode', isDarkModeToString);
  };

  useEffect(() => {
    const darkModeCookie = Cookies.get('dark-mode');
    if (darkModeCookie === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // LOCAL STORAGE
  if (typeof Storage !== 'undefined') {
    if (user === undefined || user === null) {
      const infoGet = localStorage.getItem('userToken');
      if (infoGet !== undefined && infoGet !== null) {
        setUser(JSON.parse(infoGet));
      }
    } else {
      localStorage.setItem('userToken', JSON.stringify(user));
    }
  } else {
    console.log('Erreur....');
  }

  return (
    <div
      id="App"
      className={'App ' + appClass}
    >
      <ToastContainer
        position="top-left"
        autoClose={3000}
      />
      <User.Provider value={contextValue}>
        <Router>
          <div id="LightDarkMode">
            <button
              className="mode"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineNightlight />}
            </button>
          </div>
          <Header />
          <Routes>
            <Route
              path="/"
              element={authToken ? <HomePage /> : <Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login/identity/forgotten-password"
              element={<Password />}
            />
            {/* <Route path="/hp" element={<HomePage />} /> */}
          </Routes>
          <Footer />
        </Router>
      </User.Provider>
    </div>
  );
}
