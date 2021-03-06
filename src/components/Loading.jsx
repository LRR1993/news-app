import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PushSpinner } from 'react-spinners-kit';

const styles = () => ({
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    height: 300,
    margin: '10px'
  }
});

function Loading({ classes, loading }) {
  return (
    <div>
      <Grid
        container
        className={classes.loading}
        spacing={24}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="flex-end"
      >
        <Grid item>
          <Typography variant="h4" color="primary">
            Loading
          </Typography>
        </Grid>
        <Grid item>
          <PushSpinner size={100} color="#686769" loading={loading} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Loading);
