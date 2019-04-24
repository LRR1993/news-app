import React from 'react';
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

const styles = theme => ({
  root: {
    width: '100%',
    padding: `${theme.spacing.unit/10}px`
  },
  heading: {
    backgroundColor: theme.palette.secondary.dark
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    
  },
  secondaryText:{color: theme.palette.text.secondary,},
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexGrow: 1, padding: `${theme.spacing.unit * 1.5}px`, paddingBottom: 0
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }, fab: {
    paddingTop: 0
  },
});

function MainExpansionPanel({ comment, classes}) {
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Avatar alt="author" className={classes.heading}>
              {comment.author.slice(0,1).toUpperCase()}
            </Avatar>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Comment:</Typography>
            <Typography className={classes.secondaryText}>{comment.body}</Typography>
          </div>
        </ExpansionPanelSummary>
        {/* <Divider /> */}
        <ExpansionPanelActions className={classes.fab} >
          <Fab  size="medium"color="secondary" aria-label="Edit" className={classes.fab}>
            <Edit />
          </Fab>
          <Fab  size="medium" aria-label="Delete" className={classes.fab}>
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

MainExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainExpansionPanel);


