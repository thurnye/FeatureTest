import React, { useEffect, useState } from 'react';
import styles from './GoogleCloudVisionPro.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const GoogleCloudVisionPro = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setData(result.map((el) => el.description));
  }, [result, setData]);
  return (
    <div className={styles.GoogleCloudVisionPro}>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='Enter image URL'
          />
          <button type='submit'>Analyze Image</button>
        </form>
        
      </div>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
        >
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            sx={{
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{}}>
              <Card
                sx={{
                  width: { xs: 250, md: '100%' },
                  m: { xs: 'auto', md: 'initial' },
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={imageUrl}
                  title='green iguana'
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={8} sx={{ }}>
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
                {data.map((el) => (
                  <Typography
                    variant='body2'
                    sx={{ pb: 1, borderBottom: '1px solid #cecece' }}
                  >
                    {el}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GoogleCloudVisionPro;
