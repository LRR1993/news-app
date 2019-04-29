import React from 'react';
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
import { Grid } from '@material-ui/core';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import AuthConsumer from '../context';
import { fetchArticles } from '../api';
import dateConverter from '../utils/utils';
import * as image from '../images/favicon-32x32.png';

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
  content: { marginLeft: '50px' },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white
  },
  button: {
    margin: theme.spacing.unit,
    fontFamily: theme.typography.fontFamilySecondary
  },
  userInfo: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    marginLeft: '50px'
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  }
});

class MenuDrawer extends React.Component {
  static contextType = AuthConsumer;

  state = { userArticles: [] };

  componentDidMount = async () => {
    const { user } = this.context;
    const query = {
      author: `${user.username}`
    };
    const userArticles = await fetchArticles(query);
    this.setState({ userArticles });
  };

  render() {
    const { userArticles } = this.state;
    const { isAuth, logout, user } = this.context;
    const { classes, toggleDrawer, open } = this.props;
    return (
      <div>
        <Drawer open={open}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <div className={classes.list}>
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemIcon className={classes.inline}>
                    <img src={image} alt="logo" />
                  </ListItemIcon>
                  <ListItemText className={classes.logo} primary="ostly" />
                  <ListItemIcon className={classes.exit}>
                    <Close />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <br />
                {isAuth ? (
                  <React.Fragment>
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
                    <Divider variant="inset" />
                    <br />
                    <List className={classes.userInfo} subheader={<li />}>
                      {
                        <li className={classes.listSection}>
                          <ul className={classes.ul}>
                            <ListSubheader>
                              <Typography variant="h6">My Articles</Typography>
                            </ListSubheader>
                            {userArticles.map(article => (
                              <Link
                                to={`/articles/${article.article_id}`}
                                className={classes.link}
                                key={article.article_id}
                              >
                                <ListItem key={article.article_id} button>
                                  <ListItemText
                                    className={classes.ul}
                                    primary={article.title}
                                    secondary={
                                      <Typography
                                        component="span"
                                        className={classes.inline}
                                        color="secondary"
                                        variant="body1"
                                        gutterBottom
                                      >
                                        {dateConverter(article.created_at)}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </Link>
                            ))}
                          </ul>
                        </li>
                      }
                    </List>
                  </React.Fragment>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.button}
                    >
                      <Link to="/sign-in" className={classes.link}>
                        {'Sign in'}
                      </Link>
                    </Button>
                  </Grid>
                )}
              </List>
              {isAuth && (
                <List className={classes.bottom}>
                  <ListItem button onClick={logout}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(MenuDrawer);
