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
import { IconButton, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

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
  },
  drawerIcon: {
    height:"50px",
    width:"50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover":{
      backgroundColor:"transparent"
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem:{
    ...theme.typography.tab,
    color:"white",
    opacity:0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected:{
    opacity:1
  }
}))


export default function Header(props){

  const classes = useStyles()

  const theme = useTheme();

  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down("md"))

  const [openDrawer,setOpenDrawer] = useState(false)

  const [value,setValue] = useState(0); 
  const [anchorEl,setAnchorEl] = useState(null)
  const [openMenu,setOpenMenu] = useState(false);
  const [selectedIndex,setSelectedIndex] = useState(0)

  const handleMenuItemClick = (e,i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  }

  const handleChange = (e,newValue) =>{
    setValue(newValue)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }



  const menuOptions = [
  {name: "Services", link:"/services",activeIndex:1,selectedIndex:0},
  {name:"Custom Software Developer", link:"/customesoftware",activeIndex:1,selectedIndex:1},
  {name:"Mobile App Development", link:"/mobileapps",activeIndex:1,selectedIndex:2},
  {name:"Website Development",link:"/websites",activeIndex:1,selectedIndex:3}];

  const routes = [{name:'Home',link:'/',activeIndex:0},
  {name:'Services',link:'/services',activeIndex:1,
  ariaOwns: anchorEl ? "simple-menu" : undefined,
  ariaPopup: anchorEl ? "true" : undefined,mouseOver:event => handleClick(event)},
  {name:'The Revolution',link:'/revolution',activeIndex:2},
  {name:'About Us',link:'/about',activeIndex:3},
  {name:'Contact Us',link:'/contact',activeIndex:4}]


  useEffect(() => {

    [...menuOptions,...routes].forEach(route => {
      switch(window.location.pathname){
        case `${route.link}`:
          if(value !== route.activeIndex){
            setValue(route.activeIndex)
            if(route.selectedIndex && route.selectedIndex !== selectedIndex){
              setSelectedIndex(route.selectedIndex)
            }
          }
          break;
          default:
            break;
      }
    })
  },[value,menuOptions,selectedIndex,routes])

  const tabs = (
    <>
      <Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
        {routes.map((route,index) => (
          <Tab className={classes.tab} component={Link} to={route.link} label={route.name} 
          aria-owns={route.arialOwns} aria-haspopup={route.ariaPopup} onMouseOver = {route.mouseOver}/>
        ))}
      </Tabs>
    <Button variant="contained" color="secondary" className={classes.button}>
      Free Estimate  
    </Button>
    <Menu id="simple-menu" classes={{paper:classes.menu}} anchorEl={anchorEl} open={openMenu} onClose={handleClose} MenuListProps={{onMouseLeave: handleClose}} elevation={0}>
      {menuOptions.map((option,i) => (
        <MenuItem key={i} classes={{root:classes.menuItem}} component={Link} to={option.link} onClick={(event) => {handleMenuItemClick(event,i); setValue(1); handleClose()}}  selected={i===selectedIndex && value ===1}>
          {option.name}
        </MenuItem>
      ))}
    </Menu>
    </>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer disableBackdropTransition={!iOS} 
      disableDiscovery={iOS} open={openDrawer} 
      onClose={() => setOpenDrawer(false)} 
      onOpen={() => setOpenDrawer(true)}
      classes={{paper:classes.drawer}}
      >
        <List disablePadding>
          
          {routes.map((route,index) => {
            <ListItem divider button component={Link} onClick={() => {setOpenDrawer(false);setValue(route.activeIndex) }}>
              <ListItemText disableTypography>{route.name}</ListItemText>
            </ListItem>
          })}

          <ListItem onClick={() => {setOpenDrawer(false); setValue(0)}} divider button component={Link} to="/" selected={value ===0}>
            <ListItemText className={value === 0 ? [classes.drawerItem,classes.drawerItemSelected] :classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(1)}} divider button component={Link} to="/services" selected={value ===1}>
            <ListItemText className={value === 1 ? [classes.drawerItem,classes.drawerItemSelected] :classes.drawerItem} disableTypography>
              Services
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(2)}} divider button component={Link} to="/revolution" selected={value ===2}>
            <ListItemText className={value === 2 ? [classes.drawerItem,classes.drawerItemSelected] :classes.drawerItem} disableTypography>
              Revolution
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(3)}} divider button component={Link} to="/about" selected={value ===3}>
            <ListItemText className={value === 3 ? [classes.drawerItem,classes.drawerItemSelected] :classes.drawerItem} disableTypography>
              About Us
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(4)}} divider button component={Link} to="/contact" selected={value ===4}>
            <ListItemText className={value === 4 ? [classes.drawerItem,classes.drawerItemSelected] :classes.drawerItem} disableTypography>
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => {setOpenDrawer(false); setValue(5)}} className={classes.drawerItemEstimate} divider button component={Link} to="/estimate" selected={value ===5}>
            <ListItemText className={value === 5 ? [classes.drawerItem,classes.drawerItemSelected] :classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton className = {classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </React.Fragment>
  )

    return(
        <React.Fragment>
          <ElevationScroll>
              <AppBar position="fixed" color="primary">
                  <Toolbar disableGutters>
                      <Button component={Link} to="/" disableRipple className={classes.logoContainer} onClick={() => setValue(0)} >
                        <img src={logo} className={classes.logo} alt="company logo" />
                      </Button>
                      {matches ? drawer : tabs}
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