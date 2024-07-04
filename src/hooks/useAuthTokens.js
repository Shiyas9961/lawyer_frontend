// src/hooks/useAuthTokens.js
import { useState, useEffect } from 'react';

const useAuthTokens = (userPoolWebClientId) => {
  const [tokens, setTokens] = useState({ accessToken: null, idToken: null });

  useEffect(() => {
    const fetchTokensFromStorage = () => {
        try {
            // Retrieve the last authenticated user
            const lastAuthUser = localStorage.getItem(`CognitoIdentityServiceProvider.${userPoolWebClientId}.LastAuthUser`);
    
            if (lastAuthUser) {
              // Retrieve the tokens for the last authenticated user
              const idToken = localStorage.getItem(`CognitoIdentityServiceProvider.${userPoolWebClientId}.${lastAuthUser}.idToken`);
              const accessToken = localStorage.getItem(`CognitoIdentityServiceProvider.${userPoolWebClientId}.${lastAuthUser}.accessToken`);
              
              setTokens({ accessToken, idToken });
            }
          } catch (error) {
            console.error('Error fetching tokens from storage', error);
          }
        };

    fetchTokensFromStorage();

    // Adding an interval to regularly check for token updates
    const intervalId = setInterval(fetchTokensFromStorage, 1000);

    // Clear interval on cleanup
    return () => clearInterval(intervalId)
    
  }, [userPoolWebClientId]);

  return tokens;
};

export default useAuthTokens;
