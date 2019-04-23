import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '../components/Drawer';
import ExitToApp from '@material-ui/icons/ExitToApp';

const styles = theme => ({
  title: {
    fontSize: 26
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

class MainBar extends React.Component {
  state = {
    open: true
  };

  toggleDrawer = () => {
    this.setState(state => ({ open: !state.open }));
  };
  render() {
    const { classes, user, loggedIn, logout } = this.props;
    const { open } = this.state;
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer}
            >
              <MenuIcon  />
            </IconButton>
            <div className={classes.left} />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              {'Mostly About...'}
            </Link>
            <div className={classes.right}>
              {!loggedIn ? (
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/sign-in"
                >
                  {'Sign In'}
                </Link>
              ) : null}
              {!loggedIn ? (
                <Link
                  variant="h6"
                  underline="none"
                  className={classNames(
                    classes.rightLink,
                    classes.linkSecondary
                  )}
                  href="/sign-up"
                >
                  {'Sign Up'}
                </Link>
              ) : (
                  <IconButton color="inherit" aria-label="Logout" onClick={logout}>
                  <ExitToApp  />
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {this.state.open ? (
          <Drawer
            open={open}
            toggleDrawer={this.toggleDrawer}
            loggedIn={loggedIn}
            logout={logout}
            user={user}
          />
        ) : null}
      </div>
    );
  }
}

MainBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainBar);
