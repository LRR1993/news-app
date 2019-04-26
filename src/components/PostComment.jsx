import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AuthConsumer from '../context';

const styles = () => ({
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
  static contextType = AuthConsumer;

  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = values => {
    const { postComment } = this.props;
    this.setState({ open: false });
    postComment(values);
  };

  render() {
    const { user, open } = this.context;
    const { classes, articleId } = this.props;
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
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
          <DialogContent>
            <Form
              onSubmit={this.handleClose}
              initialValues={{ username: user.username, id: articleId }}
              validate={validate}
              render={({ handleSubmit, reset, submitting, pristine }) => (
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

FormDialog.propTypes = {
  classes: PropTypes.shape('object').isRequired,
  articleId: PropTypes.number.isRequired,
  postComment: PropTypes.func.isRequired
};

export default withStyles(styles)(FormDialog);
