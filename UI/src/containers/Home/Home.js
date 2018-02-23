import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import TradesContainer from '../TradeContainer/TradeContainer';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Ticker from '../../components/UI/Ticker/Ticker';
import * as TradeActions from '../../Store/action/tradeActions';
import socketIOClient from 'socket.io-client';

const config = require('Config');
const webSocketConnectionEndpoint = config.websocketUrl;
let socket;


class Home extends Component {
    state = {
        tickerData: null
    }
    componentDidMount() {
        socket = socketIOClient(webSocketConnectionEndpoint);
        socket.on("metalPrices", data => this.setState({ tickerData: data }));
        socket.on("tradeUpdate", data => this.props.updateTrades(data));
    }
    componentWillUnmount() {
        socket.disconnect();
    }
    render () {
        return (
            <Aux>
                <Ticker data={this.state.tickerData}/>
                <Header/>
                <TradesContainer/>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTrades: (trades) => dispatch(TradeActions.fetchTradeSuccess(trades))
    };
};

export default connect(null, mapDispatchToProps)(Home)