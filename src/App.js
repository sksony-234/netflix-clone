import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { login, logout, selectUser } from './features/UserSlice';
import { auth } from './firebase';
import HomeScreen from './pages/HomeScreen';
import Login from './pages/Login';
import ProfileScreen from './pages/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        dispatch(logout());
      }

      return unsubscribe;
    })
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? <Login /> : (
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/profile" element={<ProfileScreen />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      )}
    </div>
  );
}

export default App;
