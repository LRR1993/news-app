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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import { Grid } from '@material-ui/core';

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
  },
  button: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontFamily: theme.typography.fontFamilySecondary
  },
  grid: {
    height: 70
  }
});

class MainBar extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    currentTopic: 'nothing'
  };

  componentDidMount = () => {
    const data = localStorage.getItem('dataTopic');
    // if (
    //   window.location.href !== 'http://localhost:3000/articles/cooking' ||
    //   window.location.href !== 'http://localhost:3000/articles/football' ||
    //   window.location.href !== 'http://localhost:3000/articles/coding'
    // ) {
    //   this.setState({ currentTopic: 'nothing' });
    // } else {
    if (data) {
      const topic = JSON.parse(data);
      this.setState({ currentTopic: topic });
    }
    // }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState !== this.state) {
      this.saveData();
    }
  };
  saveData = () => {
    localStorage.setItem('dataTopic', JSON.stringify(this.state.currentTopic));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({
      anchorEl: null,
      currentTopic: event.nativeEvent.target.outerText
    });
  };
  toggleDrawer = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, user, loggedIn, logout, topics } = this.props;
    const { open, anchorEl } = this.state;
    return (
      <div>
        <Grid container className={classes.grid}>
          <Grid item xs={12} >
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
                <Link
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  href="/articles"
                >
                  {'Articles'}
                </Link>
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
                <div>
                  <Fab
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="secondary"
                    variant="extended"
                    size="small"
                    className={classes.button}
                  >
                    {this.state.currentTopic}
                  </Fab>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem
                      className={classes.button}
                      onClick={this.handleClose}
                    >
                      <Link href="/" underline="none">
                        {'nothing'}
                      </Link>
                    </MenuItem>
                    {topics.map(topic => (
                      <MenuItem
                        key={topic.slug}
                        className={classes.button}
                        onClick={this.handleClose}
                      >
                        <Link href={`/articles/${topic.slug}`} underline="none">
                          {topic.slug}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
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
  logout: PropTypes.func.isRequired
};

export default withStyles(styles)(MainBar);
