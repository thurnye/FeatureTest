import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Link } from '@mui/material';
import TextField from '@mui/material/TextField';
import CustomizedButton from '../../components/CustomizedButton/CustomizedButton';
import services from '../../util/services';
import RequestFeedback from '../../components/RequestFeedback/RequestFeedback';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');

   // FeedBack States
   const [open, setOpen] = useState(false);
   const [reqLoading, setReqLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [saved, setSaved] = useState(false);
   const [showCancel, setShowCancel] = useState(false);
   const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      if (email){
        setIsError(false);
      setSaved(false);
      setReqLoading(true);
      setOpen(true);
      setMessage('');
      setShowCancel(false);
        const result = await services.postForgottenPassword({email})

        console.log(result)

      }
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data;
      setMessage(errMsg);
      setReqLoading(false);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(true);
    }
  };

  return (
    <div className={styles.ForgotPassword}>
      <Card sx={{ width: { xs: 'initial', md: 600, lg: 800 }, m: 'auto' }}>
        <CardContent sx={{height: {xs: '75vh', md:'50vh', lg: '60vh'}, display:'flex', flexDirection: 'column'}}>
          <Box>
            <Typography variant='h5' component='div'>
              Forgot Password
            </Typography>

          </Box>

          <Box sx={{flexGrow: 1}}>
            <Divider sx={{ my: 2 }} />
            <Typography variant='body2' sx={{ my: 4 }}>
              Lost your password? Please enter your email address. You will
              receive an instruction on how to create a new password via email.
            </Typography>

            <Typography
              sx={{ fontSize: 14, mb: -0.5 }}
              color='text.secondary'
              gutterBottom
            >
              Email
            </Typography>
            <TextField
              type={'email'}
              fullWidth
              id='standard-basic'
              variant='standard'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <CustomizedButton
              variant='text'
              label={'Reset password'}
              backgroundColor={'#fee86d'}
              id='demo-customized-button'
              disableElevation
              onClick={handleSubmit}
              sx={{
                fontSize: 13,
                borderRadius: 1,
                height: 30,
                fontWeight: 700,
                textTransform: 'none',
                mt: 2,
              }}
            />
          </Box>
            <Box>
              <Divider/>
              <Link href='/login' variant='body2' sx={{textDecoration:"none"}}>
                    {"Remember your password?"}
                  </Link>
            </Box>
        </CardContent>
      </Card>
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
              // navigate('/all');
            }}
            successBtnLabel={'close'}
          />
    </div>
  );
};

export default ForgotPassword;
