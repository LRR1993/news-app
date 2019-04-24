import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import { Link } from '@reach/router';
import Vote from './Vote';

import { dateConverter } from '../utils/utils';
import { deleteArticle } from '../api';
const faker = require('faker');

const styles = theme => ({
  card: {
    maxWidth: 475
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardFont: { fontFamily: theme.typography.fontFamilySecondary },
  actions: {
    display: 'flex',
    flexGow: 4
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light
  },
  learnMore: {
    fontFamily: theme.typography.fontFamilySecondary,
    marginLeft: 'auto',
    textDecoration: 'none'
  },
  body: { fontFamily: theme.typography.fontFamilySecondary }
});

function MainCard({ classes, article, disabled, learnMore }) {
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="avatar" className={classes.avatar}>
              {article.topic.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={article.title}
          subheader={dateConverter(article.created_at)}
        />
        <CardMedia
          className={classes.media}
          image={faker.image.image()}
          title="image"
        />
        <CardContent>
          <Typography className={classes.body} component="p">
            {article.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Vote votes={article.votes} id={article.article_id} />
          {!disabled ? (
            <Link
              to={`/articles/${article.article_id}`}
              className={classes.learnMore}
            >
              <Button
                onClick={learnMore}
                size="small"
                color="secondary"
                className={classes.learnMore}
              >
                Learn More
              </Button>
            </Link>
          ) : (
              <IconButton aria-label="Delete" className={classes.learnMore} onClick={() => deleteArticle(article.article_id)}>
                <DeleteIcon />
              </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainCard);
