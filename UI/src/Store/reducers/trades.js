import * as ActionTypes from '../action/actionTypes';

const initialState = {
    trades : [],
    refData: {
        counterParty: [],
        location: [],
        side: [],
        commodity: []
    }, //initial state of the ref data
    error: null, //to store any returned from the rest call
    loading: false, //to show the spinner
    selectedTrade: null, //to keep track of the state thats currently selected from the list
    showDeleteDialog: false //track if the delete confirmationdialog is open/closed
}

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
///////////////// fecth all trades //////////////////////////////////
const fetchTradeSuccess = (state, action) => {
    return updateObject(state, {trades : action.trades || [], loading: false});
}

const fetchTradeFailure = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
}

const fetchTradeStart = (state, action) => {
    return updateObject(state, {loading: true});
}
////////////// update selectd trade //////////////////////////////////
const selectedTradeUpdate = (state, action) => {
    return updateObject(state, {selectedTrade: action.tradeData});
}

const showDeleteTrade = (state, action) => {
    return updateObject(state, {showDeleteDialog: action.open});
}
/////////////// delete selected trade ///////////////////////////
const deleteSelectedTrade = (state, action) => {
    return updateObject(state, {loading: false, showDeleteDialog: false});
}
////////////// get metadata /////////////////////////////////////
const fetchRefDataSuccess = (state, action) => {
    return updateObject(state, {refData : action.refData, loading: false});
}

const fetchRefDataFailure = (state, action) => {
    return updateObject(state, {loading: false});
}

const fetchRefDataStart = (state, action) => {
    return updateObject(state, {loading: true});
}
////////////// update or add trades ///////////////////////////////////
const updateTradeStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const updateTradeSuccess = (state, action) => {
    return updateObject(state, {loading: false, selectedTrade: null}); //trades : action.trades, 
}

const updateTradeFailure = (state, action) => {
    return updateObject(state, {loading: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //all trades
        case ActionTypes.FETCH_TRADE_SUCCESS: return fetchTradeSuccess(state, action);
        case ActionTypes.FETCH_TRADE_FAILURE: return fetchTradeFailure(state, action);
        case ActionTypes.FETCH_TRADE_START: return fetchTradeStart(state, action);
        //internal updates
        case ActionTypes.UPADTE_SELECTED_TRADE: return selectedTradeUpdate(state, action);
        case ActionTypes.SHOW_DELETE_TRADE: return showDeleteTrade(state, action);
        case ActionTypes.DELETE_SELECTED_TRADE: return deleteSelectedTrade(state, action);
        //ref data
        case ActionTypes.FETCH_TRADE_REF_DATA_START: return fetchRefDataStart(state, action);
        case ActionTypes.FETCH_TRADE_REF_DATA_SUCCESS: return fetchRefDataSuccess(state, action);
        case ActionTypes.FETCH_TRADE_REF_DATA_FAILURE: return fetchRefDataFailure(state, action);
        //add - edit - delete a single trade
        case ActionTypes.UPADTE_TRADE: return updateTradeStart(state, action);
        case ActionTypes.UPDATE_TRADE_SUCCESS: return updateTradeSuccess(state, action);
        case ActionTypes.UPDATE_TRADE_FAILURE:  return updateTradeFailure(state, action);
        default: return state;
    }
}

export default reducer;