import React, { useState , useEffect} from 'react';
import { loginRequest } from './authConfig';

import { useMsal } from '@azure/msal-react';
import './App.css';

export function TokenProvider(){
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });
        setToken(response.accessToken);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (accounts.length > 0) {
      getToken();
    }
  }, [instance, accounts]);

  return { token, loading, error };
}