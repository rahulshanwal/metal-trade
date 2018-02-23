import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AppBar from 'material-ui/AppBar';
import Header from '../components/Header/Header';

configure({adapter: new Adapter()});

describe('Header component', () => {
    it('should have one App bar component', () => {
        const wrapper = shallow(<Header/>);
        expect(wrapper.find(AppBar)).toHaveLength(1);
    });
});