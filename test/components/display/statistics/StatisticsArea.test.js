import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { StatisticsArea } from '../../../../webapp/js/components/display/statistics/StatisticsArea';

describe('Component: StatisticsArea', () => {
    let component;

    const testNamespace = 'test';
    const testList = [{
        name: 'test',
        action: 'test',
        value: 'test',
        date: 'test',
        user: 'test',
    }];

    beforeEach(() => {
        component = shallow(<StatisticsArea list={ testList } namespace={ testNamespace } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
