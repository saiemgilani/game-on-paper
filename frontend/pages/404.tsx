import React, { FC, ReactElement } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

type FourOFourProps = { }

export const FourOFour: FC<FourOFourProps> = (): ReactElement => {
  return (
    <div>
      <div>
        <div>
          <Grid container>
            <Grid item xs={12} >
              <Box p={5}>
                <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
                  404
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Typography variant="h6" style={{ textAlign: 'center' }}>This page could not be found 🙁</Typography>
      </div>
    </div>
  )
}

export default FourOFour