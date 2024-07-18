import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import Home from './home';
import { InteractionStatus } from '@azure/msal-browser';

function App() {
  const { inProgress, instance, accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (instance.controller.initialized) {
      console.log('test : ', instance.controller.initialized)
      checkSession();
    }
  }, [instance.controller.initialized]);

  const checkSession = async () => {
    try {
      const response = await instance.handleRedirectPromise();
      if (response && response.account) {
        navigate("/", { replace: true });
      } else {
        isUserLoggedIn();
      }
    } catch (ex) {
      console.log('exception occurred in checkSession')
    }

  }

  const isUserLoggedIn = async () => {
    // Check if the user is already signed in
    const account = await instance.getActiveAccount();
    if (account) {
      // User is already signed in, you can proceed to  app
      navigate("/", { replace: true });
    } else {
      const resp = await instance.controller.loginRedirect();
      console.log(resp)
    }
  }
  if (!isAuthenticated && inProgress !== InteractionStatus.None) {
    return (
      <div class="spinner-border" role="status">
        <span class="sr-only visually-hidden">Loading...</span>
      </div>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
