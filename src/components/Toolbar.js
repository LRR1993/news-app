import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiToolbar from '@material-ui/core/Toolbar';

export const styles = theme => ({
  root: {
    height: 40,
    [theme.breakpoints.up('sm')]: {
      height: 40,
    },
  },
});

function Toolbar(props) {
  return <MuiToolbar {...props} />;
}

export default withStyles(styles)(Toolbar);