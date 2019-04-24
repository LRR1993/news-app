import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import api from '../api'

const styles = theme => ({
  layout: {}
});

class Vote extends Component {
  state = { voteChange: 0 };

  vote = inc_votes => {
    const { id } = this.props;
    api.vote(inc_votes, id).catch(err => console.log(err));
    this.setState(state => ({ voteChange: state.voteChange + inc_votes }));
  };

  render() {
    return <div />;
  }
}

export default withStyles(styles)(Vote);
//disabled={voteChange===1}
