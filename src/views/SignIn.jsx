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
  paper: { padding: 16, minHeight: '500px', paddingTop: 50, maxWidth: 600 },
  title: { height: 75 },
  input: {
    padding: 50
  }
});

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  return errors;
};

function SignIn({ classes }) {
  const { login } = useContext(AuthConsumer);
  return (
    <div className={classes.layout}>
      <Form
        className={classes.layout}
        onSubmit={login}
        initialValues={{ rememberMe: true }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Paper className={classes.paper}>
              <Grid container alignItems="center" spacing={8}>
                <Grid container alignItems="center" className={classes.title}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      marked="center"
                      align="center"
                    >
                      Sign In
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="body2" align="center">
                      {'Not a member yet? '}
                      <Link to="/sign-up" align="center" underline="always">
                        Sign Up here
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className={classes.input}>
                  <Field
                    id="standard-dense"
                    name="username"
                    variant="outlined"
                    fullWidth
                    required
                    component={TextField}
                    type="test"
                    label="Username"
                    margin="normal"
                  />
                  <Grid item xs={12}>
                    <FormControlLabel
                      label="Remember Me"
                      control={
                        <Field
                          name="rememberMe"
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
SignIn.propTypes = {
  classes: PropTypes.shape('object').isRequired
};

export default withStyles(styles)(SignIn);
