import React, { FC, ReactElement } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'relative',
    padding: '1.5rem',
    bottom:10,
    width: '100%',
    height: '2.5rem',            /* Footer height */
  },
}))
export const Footer: FC = ({}): ReactElement => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
      <div className={classes.footer}>
        <Typography style={{ textAlign: 'center'}}>
          Built by <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">Akshay Easwaran</a>, <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">Saiem Gilani</a> and others.
        </Typography>
      </div>
    </Grid>
  </Grid>
  )
}
