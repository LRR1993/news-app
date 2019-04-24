import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';

import { updateVote } from '../api';

const styles = theme => ({});

class Vote extends Component {
  state = { voteChange: 0 };

  vote = inc_votes => {
    const { id } = this.props;
    updateVote.vote(inc_votes, id).catch(err => console.log(err));
    this.setState(state => ({ voteChange: state.voteChange + inc_votes }));
  };

  render() {
    const { article_id, comment_id, votes } = this.props;
    return (
      <div>
        <IconButton aria-label="favorite" disabled>
          <Badge
            // className={classes.margin}
            badgeContent={votes}
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
      </div>
    );
  }
}

export default withStyles(styles)(Vote);
//disabled={voteChange===1}
