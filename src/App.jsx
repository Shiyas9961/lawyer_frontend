import './App.css';
import awsmobile from './aws-exports';
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

Amplify.configure(awsmobile)

function App() {
  const dispatch = useDispatch()
  const { idToken } = useAuthTokens(process.env.REACT_APP_AWS_CLIENT_ID)

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
