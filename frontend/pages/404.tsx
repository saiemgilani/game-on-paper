import React, { FC, ReactElement } from 'react'
import { PageHeading } from '../components/PageHeading'
import { Typography } from '@material-ui/core'

type FourOFourProps = { }

export const FourOFour: FC<FourOFourProps> = (): ReactElement => {
  return (
    <div>
      <div>
        <div>
          <PageHeading title="404" />
        </div>
        <Typography variant="h6">This page could not be found 🙁</Typography>
      </div>
    </div>
  )
}

export default FourOFour