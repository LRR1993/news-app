import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Typography, Grid, MenuItem } from '@material-ui/core';
import AuthConsumer from '../context';

const styles = () => ({
  fab: {
    margin: '10px'
  }
});

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.topic) {
    errors.topic = 'Required';
  }
  if (!values.body) {
    errors.body = 'Required';
  }
  return errors;
};

class FormDialog extends React.Component {
  static contextType = AuthConsumer;

  render() {
    const { user } = this.context;
    const {
      classes,
      handleArticleClose,
      handleArticleOpen,
      ArticleDialog,
      postArticle,
      topics
    } = this.props;
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={handleArticleOpen}
          >
            <AddIcon />
          </Fab>
          <Typography>Add Article</Typography>
        </Grid>
        <Dialog
          open={ArticleDialog}
          onClose={handleArticleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Article</DialogTitle>
          <DialogContent>
            <Form
              onSubmit={postArticle}
              initialValues={{ author: user.username }}
              validate={validate}
              render={({ handleSubmit, reset, submitting, pristine }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container alignItems="flex-start" spacing={8}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        required
                        name="title"
                        component={TextField}
                        type="text"
                        label="Title"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        required
                        name="topic"
                        component={Select}
                        label="Select a Topic"
                        formControlProps={{ fullWidth: true }}
                      >
                        {topics.map(topic => (
                          <MenuItem key={topic.slug} value={topic.slug}>
                            {topic.slug}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        required
                        name="body"
                        component={TextField}
                        type="text"
                        label="Add content here"
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
