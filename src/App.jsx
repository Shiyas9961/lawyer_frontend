import './App.css';
import awsmobile from './aws-exports';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/slices/authslice';
import useAuthTokens from './hooks/useAuthTokens';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { fetchUserFail, fetchUserStart, fetchUserSuccess } from './redux/slices/userSlice';
import axios from 'axios';

Amplify.configure(awsmobile)

function App() {
  const dispatch = useDispatch()
  const { idToken, accessToken } = useAuthTokens(process.env.REACT_APP_AWS_CLIENT_ID)
  const { token, user } = useSelector(state => state.auth)

  useEffect(() => {
    
    if (idToken) {
      dispatch(setToken({
        idToken,
        accessToken
      })); // Store the ID token in the Redux store
    }

  }, [idToken, accessToken, dispatch]);



  useEffect(() => {
    // Check if the external library is loaded
    if (window.apexcharts) {
      // Initialize plugins here
      window.apexcharts.init();
    } else {
      console.error("ApexCharts is not loaded");
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try{
        dispatch(fetchUserStart())
        const response = await axios.get(`http://localhost:8000/users/user/${user.sub}/`, {
          headers : {
            Authorization : `Bearer ${token.idToken}`
          }
        })
        if (response.status === 200){
          dispatch(fetchUserSuccess(response.data))
        }
      }catch(err){
        dispatch(fetchUserFail(err.toString()))
      }
    }
    fetchUserDetails()
  },[dispatch, user])

  return (
    <Authenticator hideSignUp={true} className='aws-authenticator'>
      {
        ({ signOut, user }) => (
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>} />
                    <Route path='profile' element={<Profile/>} />
                    <Route path='profile/:id' element={<EditProfile/>}/>
                  </Route>
                </Routes>
              </BrowserRouter>
            )
      }
    </Authenticator>
  );
}

export default App;
