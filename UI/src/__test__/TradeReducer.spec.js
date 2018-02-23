import TradeReducer from '../Store/reducers/trades';
import * as ActionTypes from '../Store/action/actionTypes';

describe('Trade reducer', () => {
    let initialState = {
        trades : [],
        refData: {
            counterParty: [],
            location: [],
            side: [],
            commodity: []
        },
        error: null,
        loading: false,
        selectedTrade: null,
        showDeleteDialog: false
    };
    it('should return the initial state', () => {
        expect(TradeReducer(undefined, {})).toEqual(initialState);
    });
    it('should return the ref data on the success event type', () => {
        expect(TradeReducer(initialState, {
            type: ActionTypes.FETCH_TRADE_REF_DATA_SUCCESS,
            refData: {counterParty:'lorem'}
        })).toEqual({
            trades : [],
            refData: {counterParty:'lorem'},
            error: null,
            loading: false,
            selectedTrade: null,
            showDeleteDialog: false
        })
    });
});