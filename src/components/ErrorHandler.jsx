import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from '@reach/router';

const backgroundImage = 'http://i.giphy.com/l117HrgEinjIA.gif';

const styles = theme => ({
  FourOhFour: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#121212',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg: {
    backgroundImage: `url(${backgroundImage})`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    mixBlendMode: 'overlay'
  },
  code: {
    fontFamily: theme.typography.fontFamily,
    height: '100%',
    color: theme.palette.common.white,
    width: '100%',
    display: 'flex',
    backgorundPosition: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    justifyContent: 'center'
  },
  title: { fontSize: '144px' },
  sub: {
    fontSize: '50px'
    // fontFamily: theme.typography.fontFamilySecondary
  },
  button: {
    margin: theme.spacing.unit,
    fontFamily: theme.typography.fontFamilySecondary
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white
  }
});

function ErrorHandler({ classes, location }) {
  return (
    <div className={classes.FourOhFour}>
      <div className={classes.bg} />
      <Grid container direction="column" justify="center" alignItems="center">
        <div className={classNames(classes.code, classes.title)}>Oops!</div>
        <div className={classNames(classes.code, classes.sub)}>
          404 - Page Not Found
        </div>
        <br />
        <Button variant="contained" color="primary" className={classes.button}>
          <Link to="/" className={classes.link}>
            {'Go to Homepage'}
          </Link>
        </Button>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ErrorHandler);
