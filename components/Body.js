import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Toolbar from '@material-ui/core/Toolbar';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AddInventory from '../components/dialogs/AddInventory';
import WithdrawInventory from '../components/dialogs/WithdrawInventory';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingTop : 20
    },
    paper: {
        padding: theme.spacing(2, 2),
        backgroundColor: theme.palette.secondary.main
    },
    paper_transaction: {
        padding: theme.spacing(2, 2),
        backgroundColor: theme.palette.secondary.main,
        maxHeight: 450,
        height: 'auto'
    },
    divider: {
        margin: theme.spacing(1, 0, 0.5),
        padding: theme.spacing(0.1, 0.1),
        backgroundColor: theme.palette.background.default
    },
    mini_divider: {
        margin: theme.spacing(0.2, 0, 0.2),
        padding: 0,
        backgroundColor: theme.palette.background.default
    },
    list: {
        paddingRight: 5
    },
    list_transaction: {
        paddingLeft: 0,
        paddingRight: 0
    },
    dt: {
        color: theme.palette.primary.dark
    },
    actions: {
        color: theme.palette.primary.blue
    },
    cart: {
        color: theme.palette.primary.orange
    },
    header: {
        color: theme.palette.primary.purple
    }
}));

export default function Body(props) {
    const classes = useStyles();

    const lists = [
        { name: 'SMAT', available: '1,400', forApproval: 0 },
        { name: 'P-Type Lifetime', available: '100', forApproval: '100' },
        { name: 'N-Type Lifetime', available: '500', forApproval: 0 },
        { name: 'Thick Polished Wafer', available: '241', forApproval: 0 },
        { name: 'Thin Polished Wafer', available: '924', forApproval: '100' },
        { name: 'Dummy/Baffles', available: '339', forApproval: '339' },
    ];

    const transactions = [
        { name: 'Kmocorro', dt: '24hrs ago', value: '100', type: 'withdraw', qual: 'SMAT' },
        { name: 'Kmocorro', value: '200', type: 'withdraw', qual: 'SMAT' },
        { name: 'Kmocorro', value: '100', type: 'withdraw', qual: 'SMAT' },
        { name: 'Kmocorro', value: '500', type: 'withdraw', qual: 'SMAT' },
    ];
    //console.log(list.approved_inventory);

    const list = props.list;
    let approved_inventory_total = 0;
    let pending_withdraw_total = 0;

    console.log(list);

    // ADD INVENTORY
    const [ openInventoryModal, setOpenInventoryModal ] = useState(false);
    const handleAddInventoryDialogOpen = () => {
        setOpenInventoryModal(true)
    }

    const handleAddInventoryDialogClose = () => {
        setOpenInventoryModal(false)
    }
    // end of add inventory

    // WITHDRAW FROM INVENTORY
    const [ openWithdrawModal, setOpenWithdrawModal ] = useState(false);
    const [ toWithdraw, setToWithdraw ] = useState({ qual: '', qty: '' });
    const handleWithdrawInventoryDialogOpen = (qual, qty) => {
        setOpenWithdrawModal(true)
        setToWithdraw({qual: qual, qty: qty});
    }

    const handleWithdrawInventoryDialogClose = () => {
        setOpenWithdrawModal(false)
    }
    // end of withdraw

    return (
        <Fragment>
        <CssBaseline />
        {
            openInventoryModal ?
            <AddInventory setToggle={props.setToggle} toggle={props.toggle} user={props.user} open={openInventoryModal} handleClose={handleAddInventoryDialogClose} lists={lists}/>
             : <></>

        }
        {
            openWithdrawModal ? 
            <WithdrawInventory setToggle={props.setToggle} toggle={props.toggle} user={props.user} open={openWithdrawModal} handleClose={handleWithdrawInventoryDialogClose} lists={lists} toWithdraw={toWithdraw}/>
            : <></>
        }
        <Container maxWidth="xl" className={classes.root}>
            <Grid container spacing={2} justify="center">
                {/* center layout -- dashboard */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="body2" component="h3" color="primary" style={{fontFamily: 'Roboto Condensed'}} >
                            Qual Wafers - Inventory
                            <IconButton color="primary" style={{float: 'right'}} onClick={handleAddInventoryDialogOpen} >
                                <PostAddIcon size="large" className={classes.actions}  />
                            </IconButton>
                        </Typography>
                        <Typography variant="h3" component="p" color="primary" style={{fontFamily: 'Eczar', fontWeight: 500}}>
                            {
                                list.approved_inventory ?
                                    list.approved_inventory.length > 0 ?
                                        approved_inventory_total = (list.approved_inventory.reduce((prev, data) => prev + data.qty, 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        
                                    :  <>0</>
                                : <>0</>
                            }
                        </Typography>
                        <Divider className={classes.divider} />
                        <List className={classes.list}>
                            {
                                /*
                                lists.map(data => (
                                    <ListItem key={data.name} >
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="left" style={{fontFamily: 'Roboto Condensed'}}>
                                                        {data.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="right" style={{fontFamily: 'Eczar', letterSpacing: 2, fontSize: 14}}>
                                                        {data.available}
                                                    </Typography>
                                                </Grid>
                                                </Grid>
                                            }
                                        >
                                        </ListItemText>
                                        <ListItemSecondaryAction style={{right: '0px'}}>
                                            <IconButton color="primary">
                                                <ArrowForwardIosIcon fontSize="small" color="primary"/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                                */
                            }
                            {
                                list.approved_inventory ?
                                    lists.map(local => (
                                        <>
                                        <ListItem key={local.name} >
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="left" style={{fontFamily: 'Roboto Condensed'}}>
                                                        {local.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="right" style={{fontFamily: 'Eczar', letterSpacing: 2, fontSize: 14}}>
                                                        {
                                                            list.approved_inventory.map(data => (
                                                                local.name === data.qual ? (data.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : <></>
                                                            ))
                                                        }
                                                    </Typography>
                                                </Grid>
                                                </Grid>
                                            }
                                        >
                                        </ListItemText>
                                        {/*
                                        <ListItemSecondaryAction style={{right: '0px'}}>
                                            <IconButton color="primary">
                                                <ArrowForwardIosIcon fontSize="small" color="primary"/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        */}
                                        
                                        <ListItemSecondaryAction style={{right: '0px'}}>
                                                {
                                                    list.approved_inventory.map(data => (
                                                        local.name === data.qual ?
                                                        <IconButton color="primary" onClick={() => handleWithdrawInventoryDialogOpen(data.qual, data.qty)} >
                                                                    <ShoppingCartOutlinedIcon style={{fontSize: 18}} className={classes.cart} />
                                                                    
                                                        </IconButton>
                                                        : <></>
                                                    ))
                                                }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider className={classes.mini_divider} />
                                    </>
                                    )) 
                                :
                                <></>
                            }
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="body2" component="h3" color="primary" style={{fontFamily: 'Roboto Condensed'}} >
                            Withdraw - Pending for Approval
                            <IconButton color="primary" style={{float: 'right'}}>
                                <PlaylistAddCheckIcon size="small" className={classes.actions} />
                            </IconButton>
                        </Typography>
                        <Typography variant="h3" component="p" color="primary" style={{fontFamily: 'Eczar', fontWeight: 500}}>
                            {
                                list.pending_withdraw ?
                                    list.pending_withdraw.length > 0 ?
                                        pending_withdraw_total = (list.pending_withdraw.reduce((prev, data) => prev + data.qty, 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        
                                    :  <>0</>
                                : <>0</>
                            }
                        </Typography>
                        <Divider className={classes.divider} />
                        <List className={classes.list}>
                            {
                                list.pending_withdraw ?
                                    lists.map(local => (
                                        <>
                                        <ListItem key={local.name} >
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="left" style={{fontFamily: 'Roboto Condensed'}}>
                                                        {local.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="right" style={{fontFamily: 'Eczar', letterSpacing: 2, fontSize: 14}}>
                                                        {
                                                            list.pending_withdraw.map(data => (
                                                                local.name === data.qual ? (data.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : <></>
                                                            ))
                                                        }
                                                    </Typography>
                                                </Grid>
                                                </Grid>
                                            }
                                        >
                                        </ListItemText>
                                        {/*
                                        <ListItemSecondaryAction style={{right: '0px'}}>
                                            <IconButton color="primary">
                                                <ArrowForwardIosIcon fontSize="small" color="primary"/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        */}
                                    </ListItem>
                                    <Divider className={classes.mini_divider} />
                                    </>
                                    )) 
                                :
                                <></>
                            }
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="body2" component="h3" color="primary" style={{fontFamily: 'Roboto Condensed'}} >
                           Transaction History
                        </Typography>
                        <Divider className={classes.divider} />
                        <List className={classes.list}>
                            {
                                transactions.map(data => (
                                    <>
                                    <ListItem >
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="left" variant="body2" style={{fontFamily: 'Roboto Condensed'}}>
                                                        {data.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                                    <Typography color="primary" align="right" style={{fontFamily: 'Eczar', letterSpacing: 2, fontSize: 14}}>
                                                        {data.value}
                                                    </Typography>
                                                </Grid>
                                                </Grid>
                                            }
                                        >
                                        </ListItemText>
                                    </ListItem>
                                    <Divider className={classes.mini_divider} />
                                    </>
                                ))
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </Fragment>
    );
}