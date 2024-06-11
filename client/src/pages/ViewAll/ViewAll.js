import React, { useEffect, useState } from 'react';
import styles from './ViewAll.module.css';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import services from '../../util/services';
import RequestFeedback from '../../components/RequestFeedback/RequestFeedback';
import Spinner from '../../components/Spinner/Spinner';

const ViewAll = () => {
  const [allData, setAllData] = useState([]);

  // FeedBack States
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAllData = async (id) => {
    try {
      setIsError(false);
      setSaved(false);
      setMessage('');
      setShowCancel(false);
      setLoading(true);
      const result = await services.findAllUsers();
      setAllData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('ERROR:::', error);
      const errMsg = error.response.data;
      console.log(error.response.data);
      setMessage(errMsg);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(!open);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className={styles.ViewAll}>
      {loading ? (
        <Spinner />
      ) : (
        <Box sx={{ flexGrow: 1, my: 5 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {allData.map((el, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card sx={{}}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      No: {el._id}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {`${el.firstName} ${el.lastName}`}
                    </Typography>

                    <Typography
                      variant='body2'
                      sx={{ my: 1.5 }}
                      color='text.secondary'
                    >
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={{
                        pathname: `/single/${el._id}`,
                      }}
                      state={{ id: el._id }}
                      style={{ textDecoration: 'none', color: '#1976D2' }}
                    >
                      Check Me Out
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

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
          setOpen(!open);
        }}
        successBtnLabel={'close'}
      />
    </div>
  );
};

export default ViewAll;
