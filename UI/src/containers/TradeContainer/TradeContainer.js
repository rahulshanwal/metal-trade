import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import classes from './TradeContainer.css';
import TradesList from '../TradesList/TradesList';
import Trade from '../Trade/Trade';
import * as TradeActions from '../../Store/action/tradeActions';
import ConfirmationDialog from '../../components/UI/ConfirmationDialog/ConfirmationDialog';
import Loader from '../../components/UI/Loader/Loader';

class TradeContainer extends Component {
    render () {
        let tradeContainer = (<div className={classes.Container}>
            <TradesList/>
            <Trade/>
            <ConfirmationDialog title={'Delete Trade'} 
                text={'Are you sure you want delete this trade ?'}
                open={this.props.isConfirmationDialogOpen}
                handleSubmitClick={()=>{this.props.deleteSelectedTrade(this.props.selectedTrade, this.props.authToken)}}
                handleCancelClick={()=>{this.props.toggleDeleteTradeDialog(false)}}/>
            <Loader show={this.props.isLoading}/>  
        </div>);
        if(!this.props.isAuthenticated) {
            tradeContainer = <div className={classes.UnAuthenticContainer}>
                <span>You need to login to trade in metals. To login or register </span>
                <Link to='/'>Click here</Link>
            </div>
        }
        return (tradeContainer);
    }
}

const mapStateToProps = state => {
    return {
      isConfirmationDialogOpen: state.tradeReducer.showDeleteDialog,
      isLoading: state.tradeReducer.loading,
      isAuthenticated: state.auth.token !== null,
      authToken: state.auth.token,
      selectedTrade: state.tradeReducer.selectedTrade
    }
  };

const mapDispatchToProps = dispatch => {
    return {
        toggleDeleteTradeDialog: (open) => dispatch(TradeActions.toggleDeleteTrade(open)),
        deleteSelectedTrade: (tradeData, authToken) => dispatch(TradeActions.deleteSelectedTrade(tradeData, authToken)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);