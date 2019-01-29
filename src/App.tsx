import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FETCH_drone_REQUEST } from './reducers/droneReducer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withRoot from './withRoot';
import { AppBar, Badge, createStyles, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar, Typography, WithStyles, withStyles, withWidth } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';


export namespace App {
  export interface Props extends WithStyles<typeof styles> {
    fetchdrone: () => void;
    drone: any
  }
}

class App extends React.Component<App.Props> {
  timeDifference = (current: any, previous: any) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  public render() {
    setInterval(this.onFetchdroneClicked, 4000); // Time in milliseconds

    const { drone, classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <ul>
            <Grid container spacing={16}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  {
                    drone &&
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Latitude : {drone && drone.response[drone.response.length - 1].latitude}<br />
                        Longitude: {drone && drone.response[drone.response.length - 1].longitude}
                      </Typography>
                      <Typography color="textSecondary">Last Received: {this.timeDifference(new Date(), drone && drone.response[drone.response.length - 1].timestamp)}</Typography>
                    </Grid>
                  }

                  {
                    !drone &&
                    <Grid item xs>
                      <img src="https://cdn.dribbble.com/users/194846/screenshots/1452453/loadingspinner.gif" width="150" height="110" alt="Loading.." />
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>
          </ul>
        </Paper>
      </div>
    );
  }

  private onFetchdroneClicked = () => {
    this.props.fetchdrone();
  }
}

const mapStateToProps = (state: any) => ({
  drone: state.droneReducer.drone
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchdrone: () => dispatch({ type: FETCH_drone_REQUEST })
})

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export const app = withRoot(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withWidth()(App))));