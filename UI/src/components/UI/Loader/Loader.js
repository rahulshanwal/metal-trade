import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Backdrop from '../Backdrop/Backdrop';

const style = {
    position: 'fixed',
    top: '45vh',
    left: '45vw'
}

const Loader = (props) => {
    let loader = props.show ? <Backdrop show={props.show}><CircularProgress style={style} size={80} thickness={5}/></Backdrop> : null
    return loader;
}

export default Loader;