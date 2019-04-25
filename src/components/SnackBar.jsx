import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from '@reach/router';
import { deleteArticle } from '../api';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

function DeleteSnackBar({ classes, data, handleDelete, api, id, snackbar=false, snackbarClose }) {
    return (
      <div>
        <Fab
          className={classes.learnMore}
          size="small"
          aria-label="Delete"
          onClick={() => {
            api(id);
            handleDelete(id)
          }}
        >
          <DeleteIcon />
        </Fab>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbar}
          autoHideDuration={5000}
          onClose={snackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">Successfully Deleted</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={snackbarClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={snackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }


DeleteSnackBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteSnackBar);
