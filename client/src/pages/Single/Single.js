import React, { useEffect, useState } from 'react';
import styles from './Single.module.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router';
import services from '../../util/services';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import RequestFeedback from '../../components/RequestFeedback/RequestFeedback';

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
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
    }
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsError(false);
      setSaved(false);
      setMessage('');
      setReqLoading(true)
      setShowCancel(false);
      setOpen(true)
      const result = await services.removeUser(id);
      if (result.status === 200) {
        setReqLoading(false)
        navigate('/all');
      }
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data;
      console.log(error.response.data);
      setReqLoading(false)
      setMessage(errMsg);
      setShowCancel(false);
      setSaved(false);
      setIsError(true);
      setOpen(!open);
    }
  };

  return (
    <div className={styles.Single}>
      {data ? (
        <Card sx={{}}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              No: {data._id}
            </Typography>
            <Typography variant='h5' component='div'>
              {`${data.firstName} ${data.lastName}`}
            </Typography>

            <Typography variant='body2' sx={{ my: 1.5 }} color='text.secondary'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              to={{
                pathname: `/edit/${data._id}`,
              }}
              state={{ id: data._id }}
              style={{ textDecoration: 'none', color: '#1976D2' }}
            >
              Edit
            </Link>
            <Button size='small' color='error' onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Spinner />
      )}

      <RequestFeedback
        successMessage={message}
        errorMessage={message}
        open={open}
        setOpen={setOpen}
        loading={reqLoading}
        isError={isError}
        saved={saved}
        showCancel={showCancel}
        handleError={() => setOpen(false)}
        errorBtnLabel={'close'}
        handleSuccess={() => {
          setOpen(false);
          navigate('/all');
        }}
        successBtnLabel={'close'}
      />
    </div>
  );
};

export default Single;
