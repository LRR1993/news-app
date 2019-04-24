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
import { Grid } from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import { Link } from '@reach/router';


const { dateConverter } = require('../utils/utils');
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
    marginLeft: 'auto', textDecoration: 'none'
  }
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
          <Typography component="p">{article.body}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="favorite" disabled>
            <Badge
              className={classes.margin}
              badgeContent={article.votes}
              color="secondary"
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="up">
            <ThumbUp />
          </IconButton>
          <IconButton aria-label="down">
            <ThumbDown />
          </IconButton>
          {!disabled && (
            <Link to={`/articles/${article.article_id}`}
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
