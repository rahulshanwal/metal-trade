import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [];
    const radioButotnStyles = {
        display: 'inline-block',
        width: '50%'
    };

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <TextField
            {...props.elementConfig}
                value={props.value || ''}
                onChange={props.changed}/>
            break;
        case ( 'select' ):
            let mItems = null;
            if(props.childConfig && props.childConfig.length > 0) {
                mItems = props.childConfig.map((item, idx)=>{
                    return <MenuItem key={props.id+'_child_'+idx} {...item} />
                })
            }
            inputElement = (
                <SelectField
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}>
                    {mItems}
                </SelectField>
            );
            break;
        case ( 'radiogroup' ):
            let rButtons=null;
            if(props.childConfig && props.childConfig.length > 0) {
                rButtons = props.childConfig.map((item, idx)=>{
                    return <RadioButton key={props.id+'_child_'+idx} {...item} 
                    disabled={props.elementConfig.disabled}
                    style={radioButotnStyles}/>
                });
            }
            inputElement = (
                <RadioButtonGroup 
                {...props.elementConfig}
                valueSelected={props.value}
                onChange={props.changed}>
                    {rButtons}
                </RadioButtonGroup>
            );
            break;
        case ( 'date' ):
            inputElement = (
                <DatePicker
                    autoOk={true}
                    floatingLabelText="Trade Date"
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    container="inline"
                    minDate={new Date()}/>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );

};

export default input;