import React, { useContext, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CommentExpansionPanel from './ExpansionPanel';
import TextField from '@material-ui/core/TextField';
import { AuthConsumer } from '../context';
import PostComment from './PostComment';

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

class Comments extends Component {
  static contextType = AuthConsumer;

  render() {
    const {
      classes,
      comments,
      handleDelete,
      snackbar,
      snackbarClose,
      handleChange,
      sort,
      criteria,
      postComment, articleId
    } = this.props;

    const { isAuth } = this.context;

    // console.log('snackbar?', snackbar)
    return (
      <List className={classes.root}>
        <CardContent>
          <Grid
            container
            spacing={40}
            direction="row"
            justify="center"
            alignItems="center"
          >
            {isAuth ? (
              <div>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Comments
                    </Typography>
                  </Grid>
                  <Grid item>
                    <PostComment postComment={postComment} articleId={articleId}/>
                  </Grid>
                </Grid>
              </div>
            ) : null}
            <Grid item>
              <TextField
                id="sort"
                select
                label="Select"
                className={classes.textField}
                value={sort}
                onChange={handleChange('sort')}
                SelectProps={{
                  native: false,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                // helperText="sort articles by"
                margin="normal"
                variant="outlined"
              >
                {criteria.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {comments.map(comment => (
            <CommentExpansionPanel
              key={comment.comment_id}
              comment={comment}
              handleDelete={handleDelete}
            />
          ))}
        </CardContent>
      </List>
    );
  }
}

export default withStyles(styles)(Comments);
