import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './SignUp.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import services from '../../util/services';
import { decodeJWToken } from '../../util/helperFunc';
import { userActions } from '../../store/userSlice';
import Spinner from '../../components/Spinner/Spinner';
import RequestFeedback from '../../components/RequestFeedback/RequestFeedback';
import Google from '../../components/Google/Google';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const id = location.state?.id;

  // FeedBack States
  const [open, setOpen] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUserData = async (id) => {
    try {
      setIsError(false);
      setSaved(false);
      setMessage('');
      setShowCancel(false);
      const result = await services.findUserById(id);
      setData(result.data);
    } catch (error) {
      console.log('ERROR:::', error);
      const errMsg = error.response.data;
      console.log(error.response.data);
      setMessage(errMsg);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(!open);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsError(false);
      setSaved(false);
      setReqLoading(true);
      setOpen(true);
      setMessage('');
      setShowCancel(false);
      const data = new FormData(event.currentTarget);
      const loginInfo = {
        ...(id && { id }),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        ...(!id && { password: data.get('password') }),
      };

      console.log(loginInfo);
      const result = await services.postUser(loginInfo);

      let token = result.data;
      localStorage.setItem('token', token);
      const userDoc = decodeJWToken(token);
      dispatch(
        userActions.login({
          user: userDoc,
        })
      );
      setReqLoading(false);
      setSaved(true);
      setMessage(id ? 'Updated Successfully' : 'User Created Successfully');
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data;
      setMessage(errMsg);
      setReqLoading(false);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(!open);
    }
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div className={styles.SignUp}>
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          {loading ? (
            <Spinner />
          ) : (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                {id ? 'Update' : 'Sign Up'}
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size='small'
                      autoComplete='given-name'
                      name='firstName'
                      defaultValue={data?.firstName || ''}
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size='small'
                      required
                      fullWidth
                      id='lastName'
                      defaultValue={data?.lastName || ''}
                      label='Last Name'
                      name='lastName'
                      autoComplete='family-name'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size='small'
                      required
                      fullWidth
                      defaultValue={data?.email || ''}
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                    />
                  </Grid>
                  {!id && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          size='small'
                          required
                          fullWidth
                          name='password'
                          label='Password'
                          type='password'
                          id='password'
                          autoComplete='new-password'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value='allowExtraEmails'
                              color='primary'
                            />
                          }
                          label='I want to receive inspiration, marketing promotions and updates via email.'
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  {id ? 'Update' : 'Sign Up'}
                </Button>

                {/* Sign up with Google */}
                {!id && (
                  <Box sx={{ mb: 3 }}>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      width='100%'
                      my={2}
                    >
                      <Box flexGrow={1} borderBottom='1px solid #cecece' />
                      <Typography variant='body2' mx={2} color='text.secondary'>
                        or
                      </Typography>
                      <Box flexGrow={1} borderBottom='1px solid #cecece' />
                    </Box>
                    <Google />
                  </Box>
                )}

                {!id && (
                  <Grid container justifyContent='flex-end'>
                    <Grid item sx={{m: 'auto'}}>
                      <Link href='/login' variant='body2'>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          )}
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      <RequestFeedback
        successMessage={message}
        errorMessage={message}
        open={open}
        setOpen={setOpen}
        loading={reqLoading}
        isError={isError}
        saved={saved}
        showCancel={showCancel}
        handleError={() => setOpen(!open)}
        errorBtnLabel={'close'}
        handleSuccess={() => {
          setOpen(!open);
          navigate('/all');
        }}
        successBtnLabel={'close'}
      />
    </div>
  );
};

export default SignUp;
