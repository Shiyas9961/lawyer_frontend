import './App.css';
import config from './amplifyconfiguration.json'
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/slices/authslice';
import useAuthTokens from './hooks/useAuthTokens';
import Profile from './pages/Profile';

Amplify.configure(config)

function App() {
  const dispatch = useDispatch()
  const { idToken } = useAuthTokens(config.aws_user_pools_web_client_id)

  useEffect(() => {
    
    if (idToken) {
      dispatch(setToken(idToken)); // Store the ID token in the Redux store
    }

  }, [idToken, dispatch]);

  return (
    <Authenticator hideSignUp={true} className='aws-authenticator'>
      {
        ({ signOut, user }) => (
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>} />
                    <Route path='profile' element={<Profile/>} />
                  </Route>
                </Routes>
              </BrowserRouter>
            )
      }
    </Authenticator>
  );
}

export default App;
