import React, { FC, ReactElement } from 'react'
import { Typography } from '@material-ui/core'

export const Footer: FC = ({}): ReactElement => {
  return (
    <div>
      <Typography style={{ textAlign: 'center' }}>
        Built by <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">Akshay Easwaran</a>, <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">Saiem Gilani</a> and others.
      </Typography>
    </div>
  )
}
