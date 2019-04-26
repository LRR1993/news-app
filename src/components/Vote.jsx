import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import AuthConsumer from '../context';
import { updateVote } from '../api';

const styles = theme => ({
  left: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start'
  }
});

class Vote extends Component {
  state = { voteChange: 0 };

  vote = inc_votes => {
    const { id, comments } = this.props;
    updateVote(inc_votes, id, comments).catch(err => console.log(err)); //add error handling here
    this.setState(state => ({ voteChange: state.voteChange + inc_votes }));
  };

  static contextType = AuthConsumer;

  render() {
    const { votes, classes } = this.props;
    const { voteChange } = this.state;
    let { isAuth } = this.context;
    return (
      <div className={classes.right}>
        <IconButton aria-label="favorite" disabled={true}>
          <Badge badgeContent={votes + voteChange} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        {isAuth ? (
          <IconButton
            aria-label="up"
            onClick={() => this.vote(1)}
            disabled={voteChange === 1 ? true : false}
          >
            <ThumbUp />
          </IconButton>
        ) : null}
        {isAuth ? (
          <IconButton
            aria-label="down"
            onClick={() => this.vote(-1)}
            disabled={voteChange === -1 ? true : false}
          >
            <ThumbDown />
          </IconButton>
        ) : null}
      </div>
    );
  }
}
// Vote.contextType = AuthConsumer;
export default withStyles(styles)(Vote);
