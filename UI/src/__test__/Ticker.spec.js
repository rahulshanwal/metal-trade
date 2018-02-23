import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Ticker from '../components/UI/Ticker/Ticker';

configure({adapter: new Adapter()});

describe('Ticker component', () => {
    it('should have one span element for each metal', () => {
        const metals = [
            {
                name: "Aluminium",
                price: 100
            },
            {
                name: "Zinc",
                price: 10
            },
            {
                name: "Copper",
                price: 25
            },
            {
                name: "Gold",
                price: 200
            },
            {
                name: "Silver",
                price: 14
            }
        ];
        const wrapper = shallow(<Ticker data={metals}/>);
        expect(wrapper.find('span')).toHaveLength(5);
    });
});