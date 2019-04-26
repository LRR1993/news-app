import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core';
import { AuthConsumer } from '../context';

const styles = theme => ({
  fab: {
    margin: '10px'
  }
});

const validate = values => {
  const errors = {};
  if (!values.body) {
    errors.body = 'Required';
  }
  return errors;
};

class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  static contextType = AuthConsumer;

  render() {
    const { user } = this.context;
    const { classes, postComment, articleId } = this.props;
    return (
      <div>
        <Fab
          size="small"
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
          <DialogContent>
            <Form
              onSubmit={() => {
                postComment();
                this.handleClose();
              }}
              initialValues={{ username: user.username, id: articleId }}
              validate={validate}
              render={({
                handleSubmit,
                reset,
                submitting,
                pristine,
                values
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container alignItems="flex-start" spacing={8}>
                    <Grid item xs={12}>
                      <Field
                        required
                        fullWidth
                        name="body"
                        component={TextField}
                        multiline
                        label="Comment"
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog);
