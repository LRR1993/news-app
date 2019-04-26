import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  withStyles
} from '@material-ui/core';

import { Link } from '@reach/router';

// import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from 'material-ui-pickers';
const backgroundImage =
  // 'curvyLines.png';
require('../images/curvyLines.png');

const styles = theme => ({
  
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
  paper: { padding: 16, minHeight: '500px', paddingTop: 50, maxWidth: 600, },
  title: { height: 75 },
  input: {
    padding: 50,
  }
});

// function DatePickerWrapper(props) {
//   const {
//     input: { name, onChange, value, ...restInput },
//     meta,
//     ...rest
//   } = props;
//   const showError =
//     ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
//     meta.touched;

//   return (
//     <DatePicker
//       {...rest}
//       name={name}
//       helperText={showError ? meta.error || meta.submitError : undefined}
//       error={showError}
//       inputProps={restInput}
//       onChange={onChange}
//       value={value === '' ? null : value}
//     />
//   );
// }

// function TimePickerWrapper(props) {
//   const {
//     input: { name, onChange, value, ...restInput },
//     meta,
//     ...rest
//   } = props;
//   const showError =
//     ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
//     meta.touched;

//   return (
//     <TimePicker
//       {...rest}
//       name={name}
//       helperText={showError ? meta.error || meta.submitError : undefined}
//       error={showError}
//       inputProps={restInput}
//       onChange={onChange}
//       value={value === '' ? null : value}
//     />
//   );
// }

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  return errors;
};

function SignIn({ classes }) {
  return (
    <div className={classes.layout}>
      <Form className={classes.layout}
        onSubmit={onSubmit}
        initialValues={{ employed: true, stooge: 'larry' }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
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
                    id='standard-dense'
                    name="username"
                    variant='outlined'
                    fullWidth
                    required
                    component={TextField}
                    type="test"
                    label="Username"
                    autoComplete="username"
                    margin='normal'
                  />
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

export default withStyles(styles)(SignIn);
