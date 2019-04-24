import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '../components/Drawer';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import { Grid } from '@material-ui/core';
import { Link } from '@reach/router';

const styles = theme => ({
  title: {
    fontSize: 26,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none'
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none'
  },
  button: {
    color: theme.palette.secondary.dark,
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontFamily: theme.typography.fontFamilySecondary,
    textDecoration: 'none'
  },
  grid: {
    height: 70
  }
});

class MainBar extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      classes,
      user,
      loggedIn,
      logout,
      topics,
      currentTopic,
      anchorEl,
      handleMenuClick,
      handleMenuClose
    } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <AppBar position="fixed">
              <Toolbar className={classes.toolbar}>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <Link to="/articles" className={classes.rightLink}>
                  {'Articles'}
                </Link>
                <div className={classes.left} />
                <Link to="/" className={classes.title}>
                  {'Mostly About...'}
                </Link>
                <div>
                  <Fab
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    color="secondary"
                    variant="extended"
                    size="small"
                    className={classes.button}
                  >
                    {currentTopic}
                  </Fab>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      className={classes.button}
                      onClick={handleMenuClose}
                    >
                      <Link to="/" className={classes.button}>
                        {'nothing'}
                      </Link>
                    </MenuItem>
                    <MenuItem
                      className={classes.button}
                      onClick={handleMenuClose}
                    >
                      <Link to="/articles" className={classes.button}>
                        {'everything'}
                      </Link>
                    </MenuItem>
                    {topics.map(topic => (
                      <MenuItem
                        key={topic.slug}
                        className={classes.button}
                        onClick={handleMenuClose}
                      >
                        <Link
                          to={`/articles/topic/${topic.slug}`}
                          className={classes.button}
                        >
                          {topic.slug}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <div className={classes.right}>
                  {!loggedIn ? (
                    <Link
                      to="/sign-in"
                      color="inherit"
                      variant="h6"
                      underline="none"
                      className={classes.rightLink}
                    >
                      {'Sign In'}
                    </Link>
                  ) : null}
                  {!loggedIn ? (
                    <Link
                      to="/sign-up"
                      variant="h6"
                      underline="none"
                      className={classNames(
                        classes.rightLink,
                        classes.linkSecondary
                      )}
                    >
                      {'Sign Up'}
                    </Link>
                  ) : (
                    <IconButton
                      color="inherit"
                      aria-label="Logout"
                      onClick={logout}
                    >
                      <ExitToApp />
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired,
  currentTopic: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  handleMenuClick: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired
};

MainBar.defaultProps = {
  anchorEl: null
};

export default withStyles(styles)(MainBar);
