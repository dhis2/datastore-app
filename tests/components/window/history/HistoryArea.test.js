import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { HistoryArea } from '../../../../webapp/js/components/window/history/HistoryArea';
import { TableRow } from 'material-ui/Table';

describe('Component: HistoryArea', () => {
    let component;

    const testList = [{
        name: 'test',
        action: 'test',
        value: 'test',
        date: 'test',
        user: 'test',
    }];

    beforeEach(() => {
        component = shallow(<HistoryArea list={ testList } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render rows equal to testList length plus one', () => {
        expect(component.find(TableRow).length).to.equal(testList.length + 1);
    });
});
