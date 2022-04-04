
import React  from 'react';
import { css } from "@emotion/react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#F39C12',
    },
  }));



function WSppiner(props) {

    const classes=useStyles();
    let loading = props.isLoading;
    return (  
 
      <div className="sweet-loading">
       {loading ? ( <Backdrop  className={classes.backdrop} open>
        <CircularProgress  size={100} color="inherit" />
      </Backdrop> ): null}    
      </div>
    );
  }
  
  export default WSppiner;