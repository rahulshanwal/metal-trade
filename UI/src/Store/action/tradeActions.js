import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

//start updating a trade
export const updateTradeStart = () => {
    return {
        type: actionTypes.UPADTE_TRADE
    };
};
//add or edit trade success
export const updateTradeSuccess = (trades) => {
    return {
        type: actionTypes.UPDATE_TRADE_SUCCESS,
        trades: trades
    };
};
//update trade failure
export const updateTradeFailure = (err) => {
    return {
        type: actionTypes.UPDATE_TRADE_FAILURE,
        error: err.message
    };
};

//update trade when edit/added by clicking on the save button
export const updateTrade = (tradeData, authToken, userId) => {
   return dispatch => {
        dispatch(updateTradeStart());
        tradeData.userId = userId;
        tradeData.tradeDate = `${tradeData.tradeDate.getFullYear()}-${tradeData.tradeDate.getMonth() + 1}-${tradeData.tradeDate.getDate()}`;
        let tradePromise;
        if(typeof tradeData._id !== 'undefined' && tradeData._id !== null) {
        tradePromise =  axios.put('/trade?auth_token='+authToken, {trade: tradeData});
        }
        else {
            tradePromise = axios.post('/trade?auth_token='+authToken, {trade: tradeData});
        }
        tradePromise.then(response => {
            dispatch(updateTradeSuccess(response.data.trades));
        }).catch(err => {
            dispatch(updateTradeFailure(err));
        });
    }  
}
//update selected trade property of the model when a row is selected from the list
export const updateSelectedTrade = (tradeData, auth_token) => {
    return dispatch => {
        dispatch({type: actionTypes.UPADTE_SELECTED_TRADE, tradeData:tradeData});
       }
}
//delete selected trade by clicking the delete butotn from list or trade container
export const deleteSelectedTrade = (tradeData, authToken) => {
    return dispatch => {
        dispatch(updateTradeStart());
        if(tradeData._id !== 'undefined' && tradeData._id !== null){
            axios.delete('/trade?auth_token='+authToken, {headers: { 'Content-Type': 'application/json'}, data:{id: tradeData._id, userId: tradeData.userId}})
            .then(response => {
                dispatch({type: actionTypes.DELETE_SELECTED_TRADE, trades: response.data.trades});
            }).catch(err => {
                dispatch(updateTradeFailure(err));
            });
        }
       }
}
//open or close the delete confirmation dialog
export const toggleDeleteTrade = (open) => {
    return dispatch => {
        dispatch({type: actionTypes.SHOW_DELETE_TRADE, open: open});
       }
}
//start fetching trades
export const fetchTradeStart = () => {
    return {
        type: actionTypes.FETCH_TRADE_START
    };
};
//get All trades success
export const fetchTradeSuccess = (trades) => {
    return {
        type: actionTypes.FETCH_TRADE_SUCCESS,
        trades: trades
    };
};
//get All trades failure
export const fetchTradeFailure = (err) => {
    return {
        type: actionTypes.FETCH_TRADE_FAILURE,
        error: err.message
    };
};
//fetch all trades for the user
export const fetchTrades = (authToken, userId) => {
    return dispatch => {
        dispatch(fetchTradeStart());
        axios.get('/trades?auth_token='+authToken+'&userId='+userId)
        .then(response => {
            dispatch(fetchTradeSuccess());
        }).catch(err => {
            dispatch(fetchTradeFailure(err));
        })
   }
}
//start fetching ref data
export const fetchTradeRefDataStart = () => {
    return {
        type: actionTypes.FETCH_TRADE_REF_DATA_START
    };
};
//get metadata success
export const fetchTradeRefDataSuccess = (refData) => {
    return {
        type: actionTypes.FETCH_TRADE_REF_DATA_SUCCESS,
        refData: refData
    };
};
//get metadata failure
export const fetchTradeRefDataFailure = () => {
    return {
        type: actionTypes.FETCH_TRADE_REF_DATA_FAILURE
    };
};
//fetch metadata for location, counter party and side
export const getTradeRefData = () => {
    return dispatch => {
        dispatch(fetchTradeRefDataStart());
        axios.get('/getRefData')
        .then(response => {
            dispatch(fetchTradeRefDataSuccess(response.data.refData));
        }).catch(err => {
            dispatch(fetchTradeRefDataFailure(err));
        })
   }
}
//update all trades from websocket connection
export const updateAlltrades = (trades) => {
    return dispatch => {
        dispatch(fetchTradeSuccess(trades));
    }
}