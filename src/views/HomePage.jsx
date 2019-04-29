import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Grid } from '@material-ui/core';
import { Link } from '@reach/router';
import { fetchArticles } from '../api';
import Loading from '../components/Loading';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const faker = require('faker');
const backgroundImage = require('../images/curvyLines.png');

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%'
  },
  welcome: {
    width: '100%',
    height: '600px',
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white,
      fontFamily: theme.typography.fontFamilySecondary
    },
    button: {
      margin: theme.spacing.unit,
      fontFamily: theme.typography.fontFamilySecondary
    }
  },
  bg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${require('../images/book.gif')})`,
    mixBlendMode: 'overlay',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  feature: {
    backgroundColor: '#fff9fc',
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '500px',
    text: {
      backgroundColor: 'red',
      width: '50px',
      height: '50px'
    }
  },
  help: {
    width: '100%',
    height: '300px',
    button: {
      margin: theme.spacing.unit * 6
    },
    link: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3
    }
  }
});

class HomePage extends React.Component {
  state = {
    activeStep: 0,
    loading: true,
    articles: []
  };

  componentDidMount = async () => {
    const articles = await fetchArticles({ limit: 5, sort_by: 'votes' });
    this.setState({ articles, loading: false });
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep, articles, loading } = this.state;
    const maxSteps = articles.length;

    return (
      <React.Fragment>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.welcome}
            >
              <div className={classes.bg} />
              <div>Welcome to</div>
              <Typography
                color="default"
                align="center"
                variant="h2"
                marked="center"
              >
                Mostly
              </Typography>
              <br />
              <Typography
                color="inherit"
                align="center"
                variant="h5"
                className={classes.h5}
              >
                Enjoy various articles on many topics,
              </Typography>
              <Typography
                color="inherit"
                align="center"
                variant="h5"
                className={classes.h5}
              >
                come inside to see
              </Typography>
              <br />
              <Link to="/sign-up" className={classes.welcome.link}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  className={classes.welcome.button}
                >
                  Register
                </Button>
              </Link>
            </Grid>
            <Grid
              container
              className={classes.feature}
              direction="row"
              justify="space-evenly"
              alignItems="center"
              nowrap
            >
              <br />
              <Grid item>
                <Typography
                  color="default"
                  align="center"
                  variant="h2"
                  marked="center"
                >
                  Featured Articles
                </Typography>
              </Grid>

              <Grid item className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                  <Typography>{articles[activeStep].title}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={this.handleStepChange}
                  enableMouseEvents
                >
                  {articles.map((step, index) => (
                    <div key={step.title}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Link to={`/articles/${step.article_id}`}>
                          <img
                            className={classes.img}
                            src={faker.image.image()}
                            alt={step.title}
                          />
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  className={classes.mobileStepper}
                  nextButton={
                    <Button
                      size="small"
                      onClick={this.handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={this.handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.help}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Button
                className={classes.help.button}
                variant="extendedFab"
                color="default"
              >
                <Typography variant="h4" component="span">
                  Got any questions? Need help?
                </Typography>
              </Button>
              <Typography variant="subtitle1" className={classes.help.link}>
                We are here to help. Get in touch!
              </Typography>
              <img src={require('../images/favicon-32x32.png')} alt="logo" />
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(HomePage);
