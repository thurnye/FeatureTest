import React, { useEffect, useState } from 'react';
import styles from './GoogleCloudVisionPro.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import CustomizedButton from '../../components/CustomizedButton/CustomizedButton';
import Dropzone from 'react-dropzone';
import { LiaCameraRetroSolid } from 'react-icons/lia';
import Grid from '@mui/material/Grid';
import RequestFeedback from '../../components/RequestFeedback/RequestFeedback';

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const GoogleCloudVisionPro = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [displayImage, setDisplayImage] = useState('')
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);
  const [uploadType, setUploadType] = useState('link');

   // FeedBack States
   const [open, setOpen] = useState(false);
   const [reqLoading, setReqLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [saved, setSaved] = useState(false);
   const [showCancel, setShowCancel] = useState(false);
   const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      setData([]);
      setIsError(false);
      setSaved(false);
      setReqLoading(true);
      setOpen(true);
      setMessage('');
      setShowCancel(false);
      const response = await fetch('http://localhost:9000/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadType === 'link' ? imageUrl : '',
          base64Image: uploadType === 'upload' ? base64Image : '',
        }),
      });

      const data = await response.json();
      console.log(data);
      setReqLoading(false);
      setSaved(true);
      setMessage('Analysis Completed');
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      const errMsg = error.response?.data;
      setMessage(errMsg);
      setReqLoading(false);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (Array.isArray(result)) {
      setData(result.map((el) => el.description));
    } else {
      setData([]);
    }
  }, [result, setData]);

  useEffect(() => {
    setResult([]);
    setData([]);
  }, [uploadType, setUploadType]);

  return (
    <div className={styles.GoogleCloudVisionPro}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <CustomizedButton
            variant='text'
            label={'Use Link'}
            id='demo-customized-button'
            disableElevation
            onClick={() => {
              setDisplayImage('')
              setBase64Image('')
              setUploadType('link')
            }}
            sx={{
              fontSize: 13,
              borderRadius: 1,
              height: 30,
              fontWeight: 700,
              textTransform: 'none',
              mt: 2,
              mx: 4,
            }}
          />
          <CustomizedButton
            variant='text'
            label={'Image Upload'}
            id='demo-customized-button'
            disableElevation
            onClick={() => {
              setUploadType('upload')
              setDisplayImage('')
              setImageUrl('')
            }}
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
          {uploadType === 'upload' && (
            <Box sx={{ textAlign: 'end' }}>
              <CustomizedButton
                variant='contained'
                label={'Analyze Image'}
                backgroundColor={'#000000'}
                id='demo-customized-button'
                onClick={() => displayImage && handleSubmit()}
                disabled={!displayImage}
                sx={{
                  fontSize: 13,
                  borderRadius: 0,
                  height: 40,
                  width: 200,
                  textWrap: 'no-wrap',
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {uploadType === 'upload' && (
                <Box sx={{ 
                   my: 5
                  }}>
                    <Dropzone
                      multiple={false}
                      onDrop={async (acceptedFiles) => {
                        if (acceptedFiles.length > 1) {
                          alert('You can select only one file.');
                          return;
                        }
                        const base64 = await convertToBase64(acceptedFiles[0]);
                        setBase64Image(base64);
                        // setImageUrl(base64); // Set for preview
                        setDisplayImage(base64)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {displayImage ? (
                            <Card sx={{ m: { xs: 'auto', md: 'initial' } }}>
                              <Card sx={{ mt: 3 }}>
                                <CardContent>
                                  <img
                                    src={displayImage}
                                    className='card-img'
                                    alt='event_banner'
                                    width={500}
                                  />
                                </CardContent>
                              </Card>
                            </Card>
                          ) : (
                            <Card sx={{ maxWidth: { sm: 350, md: 650 }, mt: 3 }}>
                              <CardContent
                                className={`card-body ${styles.DropZoneCard}`}
                              >
                                <Box sx={{ textAlign: 'center' }}>
                                  <Typography
                                    variant='h3'
                                    gutterBottom
                                    sx={{ mb: 1 }}
                                  >
                                    <LiaCameraRetroSolid />
                                  </Typography>
                                  <Typography
                                    gutterBottom
                                    sx={{ mb: 1, color: '#05A8F2' }}
                                  >
                                    Add Image
                                  </Typography>
                                  <Typography
                                    variant='caption'
                                    color='text.secondary'
                                  >
                                    Choose a beautiful image that perfectly
                                    captures your event.
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}
                    </Dropzone>
                </Box>
            )}

            {uploadType === 'link' && (
              <Box
                sx={{
                  mb: 5,
                  display: 'flex',
                  width: { xs: '100%', sm: '90%', md: '70%' },
                  m: 'auto',
                }}
              >
                <TextField
                  id='outlined-searchUnsplash'
                  size='small'
                  fullWidth
                  value={imageUrl}
                  onChange={(event) => {
                    setImageUrl(event.target.value);
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderRadius: 0,
                        border: 'none',
                        boxShadow:
                          '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                      },
                    },
                    '&.Mui-focused': {
                      borderColor: '#6F7E8C',
                    },
                  }}
                />
                <CustomizedButton
                  variant='contained'
                  label={'Analyze Image'}
                  backgroundColor={'#000000'}
                  id='demo-customized-button'
                  onClick={handleSubmit}
                  disabled={!imageUrl}
                  sx={{
                    fontSize: 13,
                    borderRadius: 0,
                    height: 40,
                    width: 200,
                    textWrap: 'no-wrap',
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
        >
          {uploadType === 'link' && (
            <Grid
              item
              xs={4}
              sm={12}
              md={12}
              sx={{
                p: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {imageUrl && (
                <Card sx={{ m: { xs: 'auto', md: 'initial' } }}>
                  <Card sx={{ mt: 3 }}>
                    <CardContent>
                      <img
                        src={imageUrl}
                        className='card-img'
                        alt='event_banner'
                        width={500}
                      />
                    </CardContent>
                  </Card>
                </Card>
              )}
            </Grid>
          )}
          <Grid item xs={4} sm={12} md={12}>
            <CardContent>
              <Typography variant='h5' component='div'>
                Analysis Result:
              </Typography>
              <Divider sx={{ mb: 5 }} />
              <Box
                sx={{
                  height: { xs: '50vh', md: '50vh' },
                  overflow: 'auto',
                }}
              >
                {data.map((el, index) => (
                  <Typography
                    key={index}
                    variant='body2'
                    sx={{ py: 1, borderBottom: '1px solid #cecece' }}
                  >
                    {el}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Grid>
        </Grid>

        <RequestFeedback
        successMessage={message}
        errorMessage={message}
        savingMessage={'Analyzing Image'}
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
        }}
        successBtnLabel={'ok'}
      />
      </Box>
    </div>
  );
};

export default GoogleCloudVisionPro;
