import React, { FC, ReactElement } from 'react'
import style from '../styles/Footer.module.css'
import { Typography } from '@material-ui/core'

export const Footer: FC = ({}): ReactElement => {
  return (
    <div className={style.footer}>
      <Typography variant="caption" display="inline" className={style['footer-content']}>
        <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">
          GameOnPaper.com
        </a>, created by <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">Akshay Easwaran</a>  and <a href="http://www.github.com/saiemgilani" target="_blank" rel="noreferrer">Saiem Gilani</a>
      </Typography>
    </div>
  )
}
