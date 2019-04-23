import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  list: {
    width: 400
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 1
  },
  exit: { display: 'inline-block', float: 'right' },
  logo: { textIndent: '-30px' },
});

function MenuDrawer({ classes, toggleDrawer, open, loggedIn, logout,user }) {
  const sideList = (
    <div className={classes.list}>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemIcon className={classes.inline}>
            <img src={require('../images/favicon-32x32.png')} alt="logo" />
          </ListItemIcon>
          <ListItemText className={classes.logo} primary="ostly" />
          <ListItemIcon className={classes.exit}>
            <Close />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <br />
        {loggedIn ? (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={user.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {user.username}
                </Typography>
              }
            />
          </ListItem>
        ) : null}
      </List>
      {loggedIn ? (
        <List className={classes.bottom}>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : null}
    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // loggedIn: PropTypes.bool.isRequired,
  // logout: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);
