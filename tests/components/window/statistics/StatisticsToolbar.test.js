import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import StatisticsToolbar from '../../../../webapp/js/components/window/statistics/StatisticsToolbar';
import Paper from 'material-ui/Paper';

describe('Component: StatisticsToolbar', () => {
    let component;

    const testNamespace = 'test';

    beforeEach(() => {
        component = shallow(<StatisticsToolbar namespace={ testNamespace } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });
});
