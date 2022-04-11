import React,{useState,useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {makeStyles} from '@material-ui/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.svg'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core';

//seccion para trabajar la parte del scroll
function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles( theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom:"3em",
    [theme.breakpoints.down("md")] : {
      marginBottom:"2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  },
  logo:{
    height: "8em",
    [theme.breakpoints.down("md")] : {
      height:"7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover":{
      backgroundColor:"transparent"
    }
  },
  tabContainer:{
    marginLeft:'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth:10,
    marginLeft:"25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius:"50px",
    marginLeft:"50px",
    marginRight:"25px",
    height:"45px"
  },
  menu: {
    backgroundColor:theme.palette.common.blue,
    color:"white",
    borderRadius:"0px"
  },
  menuItem:{
    ...theme.typography.tab,
    opacity:0.7,
    "&:hover":{
      opacity:1
    }
  }
}))


export default function Header(props){

  const classes = useStyles()

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"))


  const [value,setValue] = useState(0); 
  const [anchorEl,setAnchorEl] = useState(null)
  const [open,setOpen] = useState(false);
  const [selectedIndex,setSelectedIndex] = useState(0)

  const handleMenuItemClick = (e,i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  }

  const handleChange = (e,value) =>{
    setValue(value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpen(false)
  }



  const menuOptions = [
    {name: "Services", link:"/services"},
  {name:"Custom Software Developer", link:"/customesoftware"},
  {name:"Mobile App Development", link:"/mobileapps"},
  {name:"Website Development",link:"/websites"}]


  useEffect(() => {
    if(window.location.pathname ==="/" && value !== 0){
      setValue(0)
    }else if(window.location.pathname ==="/services" && value !== 1){
      setValue(1)
    }else if(window.location.pathname ==="/revolution" && value !== 2){
      setValue(2)
    }else if(window.location.pathname ==="/about" && value !== 3){
      setValue(3)
    }else if(window.location.pathname ==="/contact" && value !== 4){
      setValue(4)
    }else if(window.location.pathname ==="/estimate" && value !== 5){
      setValue(5)
    }
    switch(window.location.pathname){
      case "/":
        if(value !== 0){
          setValue(0)
        }
      break;
      case "/services":
        if(value !== 1){
          setValue(1)
          setSelectedIndex(0)
        }
      break;
      case "/customsoftware":
        if(value !== 1){
          setValue(1)
          setSelectedIndex(1)
        }
      break;
      case "/mobileapps":
        if(value !== 1){
          setValue(1)
          setSelectedIndex(2)
        }
      break;
      case "/websites":
        if(value !== 1){
          setValue(1)
          setSelectedIndex(3)
        }
      break;
      case "/revolution":
        if(value !== 2){
          setValue(2)
        }
      break;
      case "/about":
        if(value !== 3){
          setValue(3)
        }
      break;
      case "/contact":
        if(value !== 4){
          setValue(4)
        }
      break;
      case "/contact":
        if(value !== 5){
          setValue(5)
        }
      break;
      default:
        break;
    }

  },[value])

  const tabs = (
    <>
      <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
      <Tab className={classes.tab} component={Link} to="/" label="Home"/>
      <Tab aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup = {anchorEl ? "true" : undefined} 
      onMouseOver = {(event) => handleClick(event)}  className={classes.tab} component={Link}
      to="/services" label="Services"/>
      <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution"/>
      <Tab className={classes.tab} component={Link} to="/about" label="About us"/>
      <Tab className={classes.tab} component={Link} to="/contact" label="Contact us"/>
    </Tabs>
    <Button variant="contained" color="secondary" className={classes.button}>
      Free Estimate  
    </Button>
    <Menu id="simple-menu" classes={{paper:classes.menu}} anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{onMouseLeave: handleClose}} elevation={0}>
      {menuOptions.map((option,i) => (
        <MenuItem key={i} classes={{root:classes.menuItem}} component={Link} to={option.link} onClick={(event) => {handleMenuItemClick(event,i); setValue(1); handleClose()}}  selected={i===selectedIndex && value ===1}>
          {option.name}
        </MenuItem>
      ))}
    </Menu>
    </>
  )

    return(
        <React.Fragment>
          <ElevationScroll>
              <AppBar position="fixed" color="primary">
                  <Toolbar disableGutters>
                      <Button component={Link} to="/" disableRipple className={classes.logoContainer} onClick={() => setValue(0)} >
                        <img src={logo} className={classes.logo} alt="company logo" />
                      </Button>
                      {matches ? null : tabs}
                      {/* <Typography variant="h3" color="secondary">
                        Arc Development
                      </Typography> */}
                  </Toolbar>
              </AppBar>
          </ElevationScroll>
        <div className = {classes.toolbarMargin}/>
        </React.Fragment>
        
    )
}