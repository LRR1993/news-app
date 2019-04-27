import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  FormControlLabel,
  withStyles
} from '@material-ui/core';

import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { fetchUser } from '../api';
import AuthConsumer from '../context';

const backgroundImage = require('../images/curvyLines.png');

const styles = () => ({
  layout: {
    padding: 16,
    marginTop: '-10px',

    display: 'flex',
    backgroundColor: '#fff9fc',
    backgroundImage: `url(${backgroundImage})`,

    overflow: 'hidden',

    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  paper: { padding: 50, minHeight: '500px', paddingTop: 50, maxWidth: 600 },
  title: { height: 75 },
  input: {
    padding: 35
  }
});

const validate = async values => {
  const errors = {};
  const user = await fetchUser(values.username).catch(err =>
    Promise.resolve(err)
  );
  if (user.username === values.username) {
    errors.username = 'Username already exists, please try again';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.avatar_url) {
    errors.avatar_url = 'Required';
  }
  return errors;
};

function SignUp({ classes }) {
  const { postUser } = useContext(AuthConsumer);
  return (
    <div className={classes.layout}>
      <Form
        className={classes.layout}
        onSubmit={postUser}
        initialValues={{ logMeIn: true }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Paper className={classes.paper}>
              <Grid container alignItems="center" spacing={40}>
                <Grid container alignItems="center" className={classes.title}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      marked="center"
                      align="center"
                    >
                      Register
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="body2" align="center">
                      {
                        'Not a member yet? Enter the information below to complete registration'
                      }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.input} spacing={24}>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      variant="outlined"
                      name="name"
                      component={TextField}
                      multiline
                      label="Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      name="username"
                      variant="outlined"
                      component={TextField}
                      multiline
                      label="Username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      name="avatar_url"
                      variant="outlined"
                      component={TextField}
                      multiline
                      label="Enter Avatar URL Here"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      label="Log In After Registration"
                      control={
                        <Field
                          name="logMeIn"
                          component={Checkbox}
                          type="checkbox"
                        />
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={24}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      {'Reset'}
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      {'Submit'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}
SignUp.propTypes = {
  classes: PropTypes.shape('object').isRequired
};

export default withStyles(styles)(SignUp);
