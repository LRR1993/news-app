import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AuthConsumer from '../context';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  learnMore: {
    fontFamily: theme.typography.fontFamilySecondary,
    marginLeft: 'auto',
    textDecoration: 'none'
  }
});

function MuiSnackBar({ classes, handleDelete, api, id }) {
  const { snackbarClose, snackbar, snackbarOpen } = useContext(AuthConsumer);
  return (
    <div>
      <Fab
        size="small"
        aria-label="Delete"
        onClick={() => {
          api(id);
          handleDelete(id);
          snackbarOpen();
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
        message={<span id="message-id"> {'Successfully Deleted'} </span>}
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

MuiSnackBar.propTypes = {
  classes: PropTypes.shape('object').isRequired,
  handleDelete: PropTypes.func.isRequired,
  api: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(MuiSnackBar);
