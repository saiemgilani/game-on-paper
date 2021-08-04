import React, { FC, ReactElement } from 'react'
import styles from '../styles/404.module.css'
import { PageHeading } from '../src/components/PageHeading'
import { Typography } from '@material-ui/core'
import { GetStaticPropsResult } from 'next'

type FourOFourProps = { }

export const FourOFour: FC<FourOFourProps> = ({}): ReactElement => {
  return (
    <div className={styles.error}>
      <div className={styles.container}>
        <div>
          <PageHeading title="404" />
        </div>
        <Typography variant="h6">This page could not be found 🙁</Typography>
      </div>
    </div>
  )
}

export default FourOFour
