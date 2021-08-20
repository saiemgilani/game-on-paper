import React, { ReactElement, useContext } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
import Favorite from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import Settings from "@material-ui/icons/Settings";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button'
import SunIcon from '@material-ui/icons/WbSunnyOutlined'
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline'
import MoonIcon from '@material-ui/icons/Brightness2Outlined'
import CodeIcon from '@material-ui/icons/Code'
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { ToggleThemeContext } from '../theme'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip } from '@material-ui/core'
import { NAME_AND_DOMAIN } from '../types/constants'

import logo from '../public/logo/logo.png'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactElement;
}

const useStyles = makeStyles((theme) =>({
  appBar: {
    display: "absolute",
    border: "0",
    borderRadius: "0px",
    padding: "0",
    marginBottom: "0px",
    color: '#000000',
    width: "100%",
    textColor: '#000000',
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    position: "absolute"
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
    display: "absolute",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
  toolbarContent: {
    display: "absolute",
    width: "100%",
  },
  toolbarRight: {
    display: "absolute",
    width: "100%"
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
  const large = useMediaQuery('(min-width:700px)')

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
        <Typography variant={large ? 'h4' : 'h6'} style={{ textAlign: 'center' }}>
          Game on Paper
        </Typography>
        </Button>
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
