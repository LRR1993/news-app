import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CommentExpansionPanel from './ExpansionPanel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    width: 750,
    // maxWidth: 15000,
    // backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  },
  title: {
    fontSize: 16,
    display: 'flex'
  },
  fab: {
    margin: '10px'
  },
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function Comments({ classes, comments }) {
  return (
    <List className={classes.root}>
      <CardContent>
        <Grid 
          container
          spacing={8}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Comments
          </Typography>
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
        </Grid>

        {comments.map(comment => (
          <CommentExpansionPanel key={comment.comment_id} comment={comment} />
        ))}
      </CardContent>
    </List>
  );
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
