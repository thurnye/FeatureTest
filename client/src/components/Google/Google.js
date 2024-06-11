import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import services from '../../util/services';
import styles from './Google.module.css';
import { Box } from '@mui/material';
import RequestFeedback from '../RequestFeedback/RequestFeedback';

const Google = () => {
  const [call, setCall] = useState(false);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // FeedBack States
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({
          clientId: clientId,
          scope: '',
        });
        console.log('Google API initialized');
      } catch (err) {
        console.error('Error initializing Google API', err);
      }
    };

    try {
      gapi.load('client:auth2', initClient);
    } catch (err) {
      console.error('Error loading Google API', err);
    }
  }, [clientId]);

  const onSuccess = async (res) => {
    try {
      setIsError(false);
      setSaved(false);
      setMessage('');
      setShowCancel(false);
      if (call) {
        const { email, familyName, givenName, googleId, imageUrl } = res.profileObj;
        const userData = {
          firstName: givenName,
          lastName: familyName,
          email,
          password: '',
          imageUrl,
          googleId,
        };
        console.log(userData)
        const result = await services.postGoogleLogin(userData);
        const token = result.data;
        console.log(result)
        localStorage.setItem('token', token);
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Error during sign-in', error);
      const errMsg = error.response?.data;
      setMessage(errMsg);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(true);
    }
  };

  const onFailure = (err) => {
    console.error('Google sign-in failed', err);
      const errMsg = 'something Went Wrong!';
      setMessage(errMsg);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(true);
  };

  return (
    <div className={styles.Google}>
      <Box
        sx={{
          width: 'fit-content',
          margin: 'auto',
        }}
        onClick={() => setCall(true)}
      >
        <GoogleLogin
          clientId={clientId}
          buttonText='Sign in with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />

      </Box>
      <RequestFeedback
            successMessage={message}
            errorMessage={message}
            open={open}
            setOpen={setOpen}
            isError={isError}
            saved={saved}
            showCancel={showCancel}
            handleError={() => setOpen(!open)}
            errorBtnLabel={'close'}
            handleSuccess={() => {
              setOpen(!open);;
            }}
            successBtnLabel={'close'}
          />
    </div>
  );
};

export default Google;
