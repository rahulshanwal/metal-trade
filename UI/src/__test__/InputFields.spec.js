import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import Input from '../components/UI/InputFields/InputFields';

configure({adapter: new Adapter()});

describe('InputField component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Input/>);
    });

    it('should have one text field for the element of type text', () => {
        wrapper.setProps({
            elementType:'input',
            invalid:'false',
            changed: () => {}
        });
        expect(wrapper.find(TextField)).toHaveLength(1);
    });
    it('should have one date picker field for the element of type date', () => {
        wrapper.setProps({
            elementType:'date',
            invalid:'false',
            changed: () => {}
        });
        expect(wrapper.find(DatePicker)).toHaveLength(1);
    });
    it('should have one select field for the element of type select', () => {
        wrapper.setProps({
            elementType:'select',
            invalid:'false',
            changed: () => {}
        });
        expect(wrapper.find(SelectField)).toHaveLength(1);
    });
    it('should have a radio group for the element of type radiogroup', () => {
        wrapper.setProps({
            elementType:'radiogroup',
            invalid:'false',
            elementConfig: {name: 'side'},
            changed: () => {}
        });
        expect(wrapper.find(RadioButtonGroup)).toHaveLength(1);
    });

});