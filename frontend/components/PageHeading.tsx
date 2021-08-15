import React, { FC, ReactElement } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

type PageHeadingProps = {
  title: string
}

export const PageHeading: FC<PageHeadingProps> = ({ title }): ReactElement => {
  return (
    <Grid container>
      <Grid item xs={12} >
        <Box p={5}>
          <Typography variant="h3" component="h1">
            {title}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
