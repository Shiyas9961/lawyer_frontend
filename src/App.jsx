import './App.css';
import awsmobile from './aws-exports';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/slices/authslice';
import useAuthTokens from './hooks/useAuthTokens';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { fetchUserFail, fetchUserStart, fetchUserSuccess } from './redux/slices/userSlice';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditUser from './pages/EditUser';
import ProfileSection from './components/Profile/ProfileSection';
import ProjectsSection from './components/Profile/ProjectsSection';
import TenantSection from './components/Profile/TenantSection';
import UsersSection from './components/Profile/UsersSection';
import NotFound from './components/Layouts/NotFound';

Amplify.configure(awsmobile)

function App() {
  const dispatch = useDispatch()
  const { idToken, accessToken } = useAuthTokens(process.env.REACT_APP_AWS_CLIENT_ID)
  const { token, user } = useSelector(state => state.auth)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    
    if (idToken) {
      dispatch(setToken({
        idToken,
        accessToken
      })); // Store the ID token in the Redux store
    }

  }, [idToken, accessToken, dispatch]);

  const handleToggleClick = () => {
    setToggle(!toggle)
  }



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
        dispatch(fetchUserFail(err.message))
      }
    }
    fetchUserDetails()
  },[dispatch, user])

  return (
    <Authenticator hideSignUp={true} className='aws-authenticator'>
      {
        ({ signOut, user }) => (
          <div className={`${toggle ? 'toggle-sidebar' : ''}`}>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout handleToggleClick={handleToggleClick}/>}>
                    <Route index element={<Home/>} />
                    <Route path='profile' element={<Profile/>} >
                      <Route path='users' element={<UsersSection/>} />
                      <Route index element={<ProfileSection/>} />
                      <Route path='projects' element={<ProjectsSection/>} />
                      <Route path='tenants' element={<TenantSection/>} />
                    </Route>
                    <Route path='profile/my-self/:id' element={<EditProfile/>}/>
                    <Route path='user/:id' element={<EditUser/>} />
                  </Route>
                  <Route path='*' element={<NotFound/>} />
                </Routes>
              </BrowserRouter>
          </div>
            )
      }
    </Authenticator>
  );
}

export default App;
