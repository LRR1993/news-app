import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  layoutBody: {
    color: theme.palette.common.white,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex'
  },
  iconsWrapper: {
    height: 120
  },
  icons: {
    display: 'flex'
  },
  icon: {
    width: 75,
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing.unit,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  list: {
    color: theme.palette.common.white,
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0
  },
  listItem: {
    color: theme.palette.common.white,
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2
  },
  language: {
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing.unit,
    width: 150
  },
  widthLarge: {
    color: theme.palette.common.white,
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      width: 880,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  title: { fontSize: theme.typography.h6.fontSize },
  copyright: { fontSize: theme.typography.body2.fontSize }
});

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English'
  },
  {
    code: 'fr-FR',
    name: 'Français'
  }
];

function AppFooter(props) {
  const { classes } = props;
  return (
    <Paper>
      <Typography component="footer" className={classes.root}>
        <Grid container spacing={40} className={classes.widthLarge}>
          <Grid item xs={6} sm={4} md={2}>
            <Grid
              container
              direction="column"
              justify="center"
              className={classes.iconsWrapper}
              spacing={16}
            >
              <Grid item className={classes.icons}>
                <a
                  href="https://github.com/LRR1993/news-app/tree/master/src/components"
                  className={classes.icon}
                >
                  <i class="fab fa-github fa-5x" />
                  {/* <img
                    src="/static/themes/onepirate/appFooterFacebook.png"
                    alt="GitHub"
                  /> */}
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <div className={classes.title}>Legal</div>
            <ul className={classes.list}>
              <li className={classes.listItem}>Terms</li>
              <li className={classes.listItem}>Privacy</li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <div className={classes.title}>Language</div>
            <TextField
              variant="filled"
              select
              SelectProps={{
                native: true
              }}
              className={classes.language}
            >
              {LANGUAGES.map(language => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid className={classes.title} item>
            Made by Letisha Richardson
            <div className={classes.copyright}>© 2019 Mostly About</div>
          </Grid>
        </Grid>
      </Typography>
    </Paper>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppFooter);
