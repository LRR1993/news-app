import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AuthConsumer from '../context';
import { updateVote } from '../api';

const styles = () => ({
  left: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start'
  }
});

class Vote extends Component {
  static contextType = AuthConsumer;

  state = { voteChange: 0 };

  vote = inc_votes => {
    const { id, comments } = this.props;
    updateVote(inc_votes, id, comments);
    this.setState(state => ({ voteChange: state.voteChange + inc_votes }));
  };

  render() {
    const { votes, classes } = this.props;
    const { voteChange } = this.state;
    const { isAuth } = this.context;
    return (
      <div className={classes.right}>
        <IconButton aria-label="favorite" disabled>
          <Badge badgeContent={votes + voteChange} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        {isAuth ? (
          <IconButton
            aria-label="up"
            onClick={() => this.vote(1)}
            disabled={voteChange === 1}
          >
            <ThumbUp />
          </IconButton>
        ) : null}
        {isAuth ? (
          <IconButton
            aria-label="down"
            onClick={() => this.vote(-1)}
            disabled={voteChange === -1}
          >
            <ThumbDown />
          </IconButton>
        ) : null}
      </div>
    );
  }
}

Vote.propTypes = {
  classes: PropTypes.shape('object').isRequired,
  votes: PropTypes.number.isRequired
};

export default withStyles(styles)(Vote);
