import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import { AuthConsumer } from './Auth';

import { updateVote } from '../api';

const styles = theme => ({});

class Vote extends Component {
  state = { voteChange: 0 };

  vote = inc_votes => {
    const { id, comments } = this.props;
    updateVote(inc_votes, id, comments).catch(err => console.log(err)); //add error handling here
    this.setState(state => ({ voteChange: state.voteChange + inc_votes }));
  };
  static contextType = AuthConsumer

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;
    let { isAuth } = this.context
    return (
      <div>
        <IconButton aria-label="favorite" disabled={true}>
          <Badge badgeContent={votes + voteChange} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        {isAuth ? 
          <div>
        <IconButton
          aria-label="up"
          onClick={() => this.vote(1)}
          disabled={voteChange === 1 ? true : false}
        >
          <ThumbUp />
        </IconButton>
        <IconButton
          aria-label="down"
          onClick={() => this.vote(-1)}
          disabled={voteChange === -1 ? true : false}
        >
          <ThumbDown />
            </IconButton> </div>: null}
      </div>
    );
  }
}

export default withStyles(styles)(Vote);
