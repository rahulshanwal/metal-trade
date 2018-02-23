import React, {Component} from 'react';
import { connect } from 'react-redux';

import TradeHeader from './TradeHeader/TradeHeader';
import classes from './Trade.css';
import Input from '../../components/UI/InputFields/InputFields';
import * as TradeActions from '../../Store/action/tradeActions';
import RaisedButton from 'material-ui/RaisedButton';

class Trade extends Component {
    state = {
        tradeForm: {
            tradeDate: {
                elementType: 'date',
                elementConfig: {
                    hintText: 'Trade date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            commodity: {
                elementType: 'select',
                elementConfig: {
                    hintText: 'Commodity'
                },
                value: '',
                validation: {
                    required: true
                },
                childConfig: [],
                valid: false,
                touched: false
            },
            side: {
                elementType: 'radiogroup',
                elementConfig: {
                    name: 'side'
                },
                childConfig: [{
                    value: 'Buy',
                    label: 'BUY'
                },
                {
                    value: 'Sell',
                    label: 'SELL'
                }],
                value: 'Buy',
                valid: true,
                touched: false
            },
            counterParty: {
                elementType: 'select',
                elementConfig: {
                    hintText: 'Counter Party'
                },
                childConfig:[],
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    hintText: 'Price',
                    id: 'priceInput',
                    errorText : null
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            quantity: {
                elementType: 'input',
                elementConfig: {
                    hintText: 'Quantity',
                    id: 'qtyInput',
                    errorText : null
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            location: {
                elementType: 'select',
                elementConfig: {
                    hintText: 'Location'
                },
                childConfig:[],
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isAddEditMode: false
    }
    //utiity method to check of the trade values entered are valid. Should be moved to a separate utilities file
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = typeof value !== 'object' ? value.trim() !== '' && isValid : true;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d*[.]?[0-9]+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    //submit click handler
    submitHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.tradeForm) {
            formData[formElementIdentifier] = this.state.tradeForm[formElementIdentifier].value;
        }
        formData._id = this.props.tradeData ? this.props.tradeData._id : null;
        this.props.updateTrade(formData, this.props.authToken, this.props.userId);
    }
    //cancel click handler, switch to old data and make the fields non-editable
    cancelHandler = (event) => {
        this.syncUpdatedStatefromProps();
        this.updateAddEditMode(false);
    }
    //method to handle all the input changes for a trade
    inputChangedHandler = (value, selectValue, inputIdentifier) => {
        const updatedTradeForm = {
            ...this.state.tradeForm
        };
        const updatedFormElement = { 
            ...updatedTradeForm[inputIdentifier]
        };
        updatedFormElement.value = selectValue ? selectValue : value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedTradeForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let identifier in updatedTradeForm) {
            formIsValid = updatedTradeForm[identifier].valid && formIsValid;
            if(!updatedTradeForm[identifier].valid && updatedTradeForm[identifier].touched) {
                updatedTradeForm[identifier].elementConfig.errorText = 'This is a required numeric field';
            }else{
                updatedTradeForm[identifier].elementConfig.errorText = null;
            }
        }
        this.setState({tradeForm: updatedTradeForm, formIsValid: formIsValid});
    }
    //utility method to switch the add-edit / non-editable mode
    updateAddEditMode = (val) => {
        this.setState({isAddEditMode: val});
    }
    //dispatch the delete action from here, to be handled by the model/trade reducer
    handleDeleteAction = () => {
        if(this.props.tradeData){
            this.props.showDeleteDialog(true);
        }
    }
    //life cycle method
    componentWillMount() {
        this.syncUpdatedStatefromProps();
    }
    //life cycle method
    componentWillReceiveProps(nextProps) {
        this.syncUpdatedStatefromProps(nextProps);
        this.addRefData(nextProps)
    }
    //life cycle method
    componentDidMount() {
        this.props.getTradeRefData();
    }
    addRefData(nextProps) {
        const updatedTradeFormData = {
            ...this.state.tradeForm
        };
        //checking only for commodity here, ideally should check for all the props with 'childConfig'
        //but this should be fine since all the metadata is coming together
        if(this.state.tradeForm.commodity.childConfig.length === 0){
            for (let key in updatedTradeFormData) {
                if(key === 'commodity' || key === 'counterParty' || key === 'location' || key === 'side'){
                    updatedTradeFormData[key].childConfig = nextProps.refData[key];
                }
            }
            this.setState({tradeForm: updatedTradeFormData}); 
        }
    }
    //sync state to props - called from life cycle methods
    syncUpdatedStatefromProps(nextProps, nextState) {
        const _props = nextProps || this.props;
        const _state = nextState || this.state;
        const updatedTradeFormData = {
            ..._state.tradeForm
        };
        
        for (let key in updatedTradeFormData) {
            if(_props.tradeData) {
                if(key === 'tradeDate'){
                    updatedTradeFormData[key].value = new Date(_props.tradeData[key]);
                }
                else {
                    updatedTradeFormData[key].value = _props.tradeData[key];
                }
                updatedTradeFormData[key].valid = true;
                updatedTradeFormData[key].elementConfig.errorText = null;
            }
            else {
                updatedTradeFormData[key].value = undefined;
                updatedTradeFormData[key].elementConfig.errorText = null;
                updatedTradeFormData[key].valid = false;
            }
        }
        this.setState({tradeForm: updatedTradeFormData, formIsValid: !!_props.tradeData, isAddEditMode: !_props.tradeData});
    }
    // life cycle method
    render() {
        const formElementsArray = [];
        for (let key in this.state.tradeForm) {
            formElementsArray.push({
                id: key,
                config: this.state.tradeForm[key]
            });
        }
        return (<div className={classes.TradeParent}>
            <TradeHeader tradeId={this.props.tradeData ? this.props.tradeData._id : ''} 
            changeEditMode={this.updateAddEditMode}
            onDelete={this.handleDeleteAction}/>
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => {
                    formElement.config.elementConfig.disabled = !this.state.isAddEditMode;
                    return (<Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        childConfig={formElement.config.childConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event, value, selectValue) => this.inputChangedHandler(value, selectValue, formElement.id)} />
                        
                )
            })}
                <RaisedButton label="Cancel" onClick={this.cancelHandler} disabled={!this.state.isAddEditMode}/>
                <RaisedButton label="Save" primary={true} style={{marginLeft: '10px'}} disabled={!(this.state.formIsValid && this.state.isAddEditMode)} onClick={this.submitHandler}/>
            </form>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
      tradeData: state.tradeReducer.selectedTrade,
      refData: state.tradeReducer.refData,
      authToken: state.auth.token,
      userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTrade: (tradeData, authToken, userId) => dispatch(TradeActions.updateTrade(tradeData, authToken, userId)),
        showDeleteDialog: (open) => dispatch(TradeActions.toggleDeleteTrade(open)),
        getTradeRefData: () => dispatch(TradeActions.getTradeRefData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);