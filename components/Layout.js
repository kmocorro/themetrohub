import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  refresher: {
  },
  actions: {
      color: theme.palette.primary.blue
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [ drawer, setDrawer] = useState(false);

  const toggleDrawer = isOpen => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(isOpen);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inventory', 'Transaction History', 'Admin List'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[ 'About'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          {/*
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={toggleDrawer(true)} />
          </IconButton>
          <Drawer open={drawer} onClose={toggleDrawer(false)}>
            {sideList()}
          </Drawer>
          */ }
          <Typography variant="h6" className={classes.title} style={{fontFamily: 'Roboto Condensed'}}>
            The Metrohub
          </Typography>
          <Typography variant="overlline" style={{fontFamily: 'Roboto Condensed'}}>
            {props.user.displayName}
          </Typography>
          <IconButton onClick={props.handleClickRefresh} className={classes.refresher} color="primary">
            {
              props.inventoryRefresh ?
                <CircularProgress size="1.45rem" color="primary" />
              :
                <RefreshIcon fontSize="medium" color="primary" />
            }
          </IconButton>
          <IconButton color="primary" onClick={props.logout}>
            <ExitToAppOutlinedIcon color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}