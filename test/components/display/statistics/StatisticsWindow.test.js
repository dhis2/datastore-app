import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { StatisticsDisplay } from '../../../../webapp/js/components/display/statistics/StatisticsDisplay';
import StatisticsToolbar from '../../../../webapp/js/components/display/statistics/StatisticsToolbar';
import StatisticsArea from '../../../../webapp/js/components/display/statistics/StatisticsArea';
import Paper from 'material-ui/Paper';

describe('Component: StatisticsDisplay', () => {
    let component;
    const routeParams = {
        namespace: 'test',
        key: 'test',
    }

    beforeEach(() => {
        component = shallow(<StatisticsDisplay params={routeParams} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });

    it('should render EmptyToolbar component', () => {
        expect(component.find(StatisticsToolbar)).to.have.length(1);
    });

    it('should render EmptyArea component', () => {
        expect(component.find(StatisticsArea)).to.have.length(1);
    });

});
