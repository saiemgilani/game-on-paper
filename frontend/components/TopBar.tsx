import React, { ReactElement, useContext } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import SunIcon from '@material-ui/icons/WbSunnyOutlined'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import MoonIcon from '@material-ui/icons/Brightness2Outlined'
import CodeIcon from '@material-ui/icons/Code'
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import AppBar from '@material-ui/core/AppBar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/core/styles'
import { ToggleThemeContext } from '../theme'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip } from '@material-ui/core'
import { NAME_AND_DOMAIN } from '../types/constants'

import logo from '../public/logo/logo.png'

const useStyles = makeStyles((theme) =>({
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: '#000000',
    width: "100%",
    textColor: '#000000',
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset"
  },
  absolute: {
    position: "absolute"
  },
  fixed: {
    position: "fixed"
  },
  show: {
    transform: 'translateY(0)',
    transition: 'transform .5s',
  },
  hide: {
    transform: 'translateY(-110%)',
    transition: 'transform .5s',
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    paddingLeft: '2%',
  },
  toolbarContent: {
    paddingLeft: '2%',
  },
  toolbarRight: {
    right: 0,
    position: 'relative',
    paddingRight: '2%',
  },
  button:{
    color: '#000000',
    textColor: '#000000',
  },
}))

export const TopBar = (): ReactElement => {
  const trigger = useScrollTrigger()
  const classes = useStyles()
  const { toggleTheme, isDark } = useContext(ToggleThemeContext)

  return (
    <AppBar className={trigger ? classes.hide : classes.show} position="sticky">
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <a>
          <Image
            src={logo}
            width={35}
            height={35}
            alt='Game on Paper' />
          </a>
        </Link>
        <Button variant="text" color="inherit">
              Game on Paper
        </Button>
        <div className={classes.toolbarContent}>
          <Link href="/cfb">
            <Button variant="text" color="inherit">
              <SportsFootballIcon />
              CFB
            </Button>
          </Link>
          <Link href="/mbb">
            <Button variant="text" color="inherit">
              <SportsBasketballIcon />
              MBB
            </Button>
          </Link>
        </div>
        <div className={classes.toolbarRight}>
          <Tooltip title="Toggle Theme">
            <Button variant="text" color="inherit" onClick={toggleTheme}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
