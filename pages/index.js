import React, { Fragment, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import { withAuthSync, logout } from '../utils/auth';
import Head from 'next/head';
import Layout from '../components/Layout';
import Body from '../components/Body';

import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import getHost from '../utils/get-host'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Index(props) {
  
  const classes = useStyles();
  const [ list, setList ] = useState({});
  const [ toggle, setToggle ] = useState(true);
  const [ inventoryRefresh, setInventoryRefresh ] = useState(false);

  useEffect(() => {
      async function fetchData() {
          
          setInventoryRefresh(true);
          let response = await fetch(`http://dev-metaspf401.sunpowercorp.com:8080/api/mh/onepager`);

          if(response.status === 200) {
              setList(await response.json());
              setInventoryRefresh(false);
          }
      }
      fetchData()
  }, [toggle]) 

  /**
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(`http://dev-metaspf401.sunpowercorp.com:8080/api/mh/onepager`);

      if(response.status === 200) {
        setList(await response.json());
      }
    }

    const auto_reload = setInterval(() => {
      fetchData()
    }, 2000);

    return () => clearInterval(auto_reload);
  })
  */

  const handleClickRefresh = () => {
      setToggle(!toggle);
  }

  return (
    <Fragment>
      <Head>
        <title>META - The Metrohub</title>
      </Head>
      
      <Backdrop
        className={classes.backdrop}
        open={inventoryRefresh}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Layout user={props.data.user} inventoryRefresh={inventoryRefresh} handleClickRefresh={handleClickRefresh} logout={logout}/>
      <Body setToggle={setToggle} toggle={toggle} user={props.data.user} themetrohub={props.data.themetrohub} list={list} />
    </Fragment>
  );
}


Index.getInitialProps = async (context) => {
  const {token} = nextCookie(context);
  const apiURL = getHost(context.req) + '/api/index';

  const redirectOnError = () => 
    typeof window !== 'undefined'
    ? Router.push('/login')
    : context.res.writeHead(302, { Location: '/login' }).end()

  try {

    //console.log(apiURL);
    const response = await fetch(apiURL, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
      }
    })

    const data = await response.json();

    //console.log(data)
    return data;


  } catch (error) {

    console.log(error);
    console.log('catch errorrrrr.')

  }
}


export default withAuthSync(Index)