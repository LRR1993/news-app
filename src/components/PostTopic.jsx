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
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  fab: {
    margin: '10px'
  }
});

const validate = values => {
  const errors = {};
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.slug) {
    errors.slug = 'Required';
  }
  return errors;
};

function FormDialog({
  classes,
  topicDialog,
  handleTopicOpen,
  handleTopicClose,
  postTopic
}) {
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Fab
          size="small"
          color="secondary"
          aria-label="Add"
          className={classes.fab}
          onClick={handleTopicOpen}
        >
          <AddIcon />
        </Fab>
        <Typography>Add Topic</Typography>
      </Grid>
      <Dialog
        open={topicDialog}
        onClose={handleTopicClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Topic</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={postTopic}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container alignItems="flex-start" spacing={8}>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      name="slug"
                      component={TextField}
                      multiline
                      label="New Topic"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      name="description"
                      component={TextField}
                      multiline
                      label="Description"
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

export default withStyles(styles)(FormDialog);
