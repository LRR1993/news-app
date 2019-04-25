import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Vote from './Vote';
import { Grid } from '@material-ui/core';
import { AuthConsumer } from '../context';
import { dateConverter } from '../utils/utils';
import { deleteComment } from '../api';
import SnackBar from './SnackBar';

const styles = theme => ({
  root: {
    width: '100%',
    padding: `${theme.spacing.unit / 10}px`
  },
  heading: {
    backgroundColor: theme.palette.secondary.dark
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryText: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamilySecondary
  },
  author: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamilySecondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexGrow: 1,
    padding: `${theme.spacing.unit * 1.5}px`,
    paddingBottom: 0,
    paddingTop: 0,
    user: { verticalAlign: 'baseline' }
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  fab: {
    display: 'flex',
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  user: { height: '100px', width: '80px' },
  edit: {
    display: 'flex',
    marginLeft: 'auto',
    justifyContent: 'space-evenly',
    width: '140px',
    item: { flexBasis: '50%' }
  }
});

function MainExpansionPanel({ comment, classes, handleDelete, snackbarClose, snackbar }) {
  const { isAuth } = useContext(AuthConsumer)
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column.user}>
            <Grid
              className={classes.user}
              container
              spacing={8}
              direction="column"
              justify="center"
              alignItems="center"
              alignContent="center"
              margin="auto"
            >
              <Avatar alt="author" className={classes.heading}>
                {comment.author.slice(0, 1).toUpperCase()}
              </Avatar>
              <Typography className={classes.author}>
                {comment.author}
              </Typography>
            </Grid>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Created: {dateConverter(comment.created_at)}
            </Typography>
            <Typography className={classes.secondaryText}>
              {comment.body}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelActions className={classes.fab}>
          <Vote
            votes={comment.votes}
            id={comment.comment_id}
            comments={'comments'}
          />
          {isAuth ?
            <div className={classes.edit}>
              <Fab
                className={classes.edit.item}
                size="small"
                color="secondary"
                aria-label="Edit"
              >
                <Edit />
              </Fab>
              <SnackBar data={comment} id={comment.comment_id} handleDelete={handleDelete} api={deleteComment} snackbarClose={snackbarClose} snackbar={snackbar} />
            </div> : null}
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

MainExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  snackbar: PropTypes.bool.isRequired
  
};

export default withStyles(styles)(MainExpansionPanel);
