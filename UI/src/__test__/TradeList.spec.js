import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Table} from 'material-ui/Table';
import {TradeList} from '../containers/TradesList/TradesList';

configure({adapter: new Adapter()});

describe('TradesList component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TradeList tabledata={[]} fetchTrades={()=>{}}/>);
    });
    it('should not render the table if there is an error property set', () => {
        wrapper.setProps({error: 'not able to fetch data'});
        expect(wrapper.find(Table)).toHaveLength(0);
    });
    it('should not render the table if no data is present', () => {
        expect(wrapper.find(Table)).toHaveLength(0);
    });
    it('should render the table if data is present', () => {
        let data = {"_id":12,"tradeDate":"2018-1-29","commodity":"Bi","side":"sell","counterParty":"Ipsum","price":"62","quantity":19,"location":"tky"};
        wrapper.setProps({tabledata: [data], refData: {commodity:[],side:[],counterParty:[],location:[]}});
        expect(wrapper.find(Table)).toHaveLength(1);
    });
});