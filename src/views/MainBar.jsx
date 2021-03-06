import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { Link } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import Drawer from '../components/Drawer';
import Toolbar from '../components/Toolbar';
import AppBar from '../components/AppBar';
import AuthConsumer from '../context';

const styles = theme => ({
  title: {
    fontSize: 26,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.light
    }
  },
  toolbar: {
    justifyContent: 'space-evenly'
  },
  left: {
    flexGrow: 1,
    justifyContent: 'center'
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
    marginLeft: theme.spacing.unit * 2,
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.light
    }
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
    height: 60
  }
});

class MainBar extends React.Component {
  static contextType = AuthConsumer;

  state = {
    open: false,
    anchorEl: null,
    currentTopic: 'everything'
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  toggleDrawer = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleMenuClose = event => {
    this.setState({
      anchorEl: null,
      currentTopic: event.nativeEvent.target.outerText
    });
  };

  render() {
    const {
      classes,
      topics,
      topicDialog,
      handleTopicOpen,
      handleTopicClose,
      postTopic
    } = this.props;
    const { open, anchorEl, currentTopic } = this.state;
    const { isAuth, user } = this.context;

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
                <Fab
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenuClick}
                  color="secondary"
                  variant="extended"
                  size="small"
                  className={classes.button}
                >
                  {currentTopic || 'eveything'}
                </Fab>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem
                    className={classes.button}
                    onClick={this.handleMenuClose}
                  >
                    <Link to="/articles" className={classes.button}>
                      {'everything'}
                    </Link>
                  </MenuItem>
                  {topics.map(topic => (
                    <MenuItem
                      key={topic.slug}
                      className={classes.button}
                      onClick={this.handleMenuClose}
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
                <div />
                <div className={classes.right}>
                  {!isAuth ? (
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
                  {!isAuth ? (
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
                    <React.Fragment>
                      <Typography color="inherit">
                        Hi, {user.username}
                      </Typography>
                      {/* <IconButton
                        color="inherit"
                        aria-label="Logout"
                        onClick={logout}
                      >
                        <ExitToApp />
                      </IconButton> */}
                    </React.Fragment>
                  )}
                </div>
              </Toolbar>
            </AppBar>
            {open && (
              <Drawer
                open={open}
                toggleDrawer={this.toggleDrawer}
                topicDialog={topicDialog}
                handleTopicOpen={handleTopicOpen}
                handleTopicClose={handleTopicClose}
                postTopic={postTopic}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainBar.propTypes = {
  classes: PropTypes.shape('object').isRequired,
  topics: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(MainBar);
