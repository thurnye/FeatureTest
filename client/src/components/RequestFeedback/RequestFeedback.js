import React from 'react';
import CustomizedButton from '../CustomizedButton/CustomizedButton';
import ModalDialog from '../ModalDialog/ModalDialog';
import {
  Box,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LinearProgress from '@mui/material/LinearProgress';


export default function RequestFeedback({
  open,
  setOpen,
  loading,
  isError,
  saved,
  savingMessage,
  errorMessage,
  successMessage,
  errorBtnLabel,
  successBtnLabel,
  cancelBtnLabel,
  handleError,
  handleSuccess,
  handleCancel,
  showCancel=true
}) {

  return (
    <Box>
      <ModalDialog setOpen={setOpen} open={open} fullScreen={false} size={'lg'}>
        <Box>
          <DialogContent>
            <Box>
              {loading && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LinearProgress
                    sx={{ width: { xs: '100%', sm:400 }, my: 3 }}
                    color='warning'
                  />
                  <Typography color={'warning'}>
                    {savingMessage ? savingMessage : 'Saving ...'}
                  </Typography>
                </Box>
              )}

              {isError && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ErrorOutlineIcon
                    color='error'
                    sx={{ fontSize: '3.5rem', mb: 2 }}
                  />
                  <Typography color={'error'} sx={{ textAlign: 'center' }}>
                    {errorMessage ? errorMessage : 'Something Went Wrong!.'}
                  </Typography>
                </Box>
              )}

              {saved && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CheckCircleOutlineIcon
                    color={'success'}
                    sx={{ fontSize: '3.5rem', mb: 2 }}
                  />
                  <Typography sx={{ textAlign: 'center' }}>
                    {successMessage ? successMessage : 'Saved Successfully!.'}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
        </Box>
        <DialogActions>
          <CustomizedButton
            variant='text'
            label={cancelBtnLabel ? cancelBtnLabel : 'Cancel'}
            // backgroundColor={'#fee86d'}
            id='demo-customized-button'
            disableElevation
            onClick={handleCancel ? handleCancel : () => setOpen(!open)}
            sx={{
              fontSize: 15,
              borderRadius: 1,
              height: 30,
              fontWeight: 700,
              textTransform: 'none',
              display: showCancel ? '' : 'none'
            }}
          />
          <CustomizedButton
            variant='text'
            label={successBtnLabel ? successBtnLabel : 'view Live'}
            // backgroundColor={'#fee86d'}
            id='demo-customized-button'
            disableElevation
            onClick={handleSuccess ? handleSuccess : () => ''}
            sx={{
              fontSize: 15,
              borderRadius: 1,
              height: 30,
              fontWeight: 700,
              textTransform: 'none',
              display: saved ? '' : 'none',
            }}
          />
          <CustomizedButton
            variant='text'
            label={errorBtnLabel ? errorBtnLabel : 'Retry'}
            // backgroundColor={'#fee86d'}
            id='demo-customized-button'
            disableElevation
            onClick={handleError ? handleError : () => ''}
            sx={{
              fontSize: 15,
              borderRadius: 1,
              height: 30,
              fontWeight: 700,
              textTransform: 'none',
              display: isError ? '' : 'none',
            }}
          />
        </DialogActions>
      </ModalDialog>
    </Box>
  );
}
