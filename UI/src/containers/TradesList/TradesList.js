import React, {Component} from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import AddButton from '../../components/UI/AddButton/AddButton';
import classes from './TradesList.css';
import * as TradeActions from '../../Store/action/tradeActions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const findNameFromRefData = (arr, val, prop) => {
  const matchedObj = arr.find( obj => obj.value === val);
  return matchedObj && matchedObj[prop] ? matchedObj[prop] : null;
}

export class TradeList extends Component {
  //row selection handler
  handleRowSelection = (selectedRowIndex) => {
    this.props.updateSelectedTrade(this.props.tabledata[selectedRowIndex]);
    this.props.tabledata.forEach((row, i) => { //TODO - anti- pattern - look into it later
      row.selected = selectedRowIndex.indexOf(i) > -1;
    });
  }
  //delete button handler
  handleDeleteButton = event => {
    event.stopPropagation();
    if(this.props.selectedTrade){
      this.props.showDeleteDialog(true);
    }
  }
  //life cycle method
  componentDidMount() {
    this.props.fetchTrades(this.props.authToken, this.props.userId);
  }
  // life cycle method
  render(){
    let table, deleteButtonStyle = {
      opacity : 1
    },
    deleteButtonHidden = {
      opacity : 0.1
    };
    if(this.props.error) {
      table = <div className={classes.TradeListParentError}>{this.props.error}</div>
    }
    else if(this.props.tabledata.length > 0) {
      table = <Table
      fixedHeader={true}
      selectable={true}
      multiSelectable={false}
      onRowSelection={this.handleRowSelection}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Trade Date</TableHeaderColumn>
          <TableHeaderColumn>Commodity</TableHeaderColumn>
          <TableHeaderColumn>Side</TableHeaderColumn>
          <TableHeaderColumn>QTY(MT)</TableHeaderColumn>
          <TableHeaderColumn>Price(/MT)</TableHeaderColumn>
          <TableHeaderColumn>CounterParty</TableHeaderColumn>
          <TableHeaderColumn>Location</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        deselectOnClickaway={false}
        showRowHover={true}
        stripedRows={true}
      >
        {this.props.tabledata.map( (row, index) => (
          <TableRow key={index}>
            <TableRowColumn>{row.tradeDate}</TableRowColumn>
            <TableRowColumn>{findNameFromRefData(this.props.refData['commodity'], row.commodity, 'primaryText')}</TableRowColumn>
            <TableRowColumn>{findNameFromRefData(this.props.refData['side'], row.side, 'label')}</TableRowColumn>
            <TableRowColumn>{row.quantity}</TableRowColumn>
            <TableRowColumn>{row.price}</TableRowColumn>
            <TableRowColumn>{findNameFromRefData(this.props.refData['counterParty'], row.counterParty, 'primaryText')}</TableRowColumn>
            <TableRowColumn>{findNameFromRefData(this.props.refData['location'], row.location, 'primaryText')}</TableRowColumn>
            <TableRowColumn>
              <IconButton style={row.selected ? deleteButtonStyle : deleteButtonHidden}>
                <ActionDelete onClick={this.handleDeleteButton}/>
              </IconButton>
            </TableRowColumn>
          </TableRow>
          ))}
      </TableBody>
    </Table>

    } else if(this.props.tabledata.length === 0){
      table = <div className={classes.TradeListParentError}>No trade data found. Add new trades</div>
    }

    return (<div className={classes.TradeListParent}>
        {table}
        <AddButton className={classes.AddButton} clicked={()=>{this.props.updateSelectedTrade(undefined)}}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    tabledata: state.tradeReducer.trades,
    authToken: state.auth.token,
    error: state.tradeReducer.error,
    refData: state.tradeReducer.refData,
    selectedTrade: state.tradeReducer.selectedTrade,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
      updateSelectedTrade: (tradeData) => dispatch(TradeActions.updateSelectedTrade(tradeData)),
      showDeleteDialog: (open) => dispatch(TradeActions.toggleDeleteTrade(open)),
      fetchTrades: (token, userId) => dispatch(TradeActions.fetchTrades(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeList);