import React from "react";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from 'classnames';
import { Card, CardContent, Typography, Grid, CircularProgress } from "@material-ui/core";
const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return (<CircularProgress style={{marginTop:"150px"}} color="secondary" thikness={200} size={100}/>);
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={10} md={3} className={cx(styles.card,styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography varient="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography varient="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={10} md={3} className={cx(styles.card,styles.recovered)}>

          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography varient="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}
          </Typography>
            <Typography varient="body2">
              Number of Recovered people from COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={10} md={3} className={cx(styles.card,styles.deaths)}>

          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography varient="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography varient="body2">
              Number of Deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
