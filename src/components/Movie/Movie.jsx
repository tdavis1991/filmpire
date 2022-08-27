import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Movie = ({ movie, i }) => {
  
  const classes = useStyles();

  const movieRating = movie.vote_average / 2;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img 
            alt={movie.title} 
            className={classes.image} 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
          />
          <Typography className={classes.title} variant='h5'>{movie.title}</Typography>
          <Tooltip disableTouchListener title={`${movieRating.toFixed(1)} / 5`}>
            <div>
              <Rating readOnly value={movieRating} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  )
}

export default Movie;

