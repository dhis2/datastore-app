import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { StatisticsWindow } from '../../webapp/js/components/window/statistics/StatisticsWindow';
import StatisticsToolbar from '../../webapp/js/components/window/statistics/StatisticsToolbar';
import StatisticsArea from '../../webapp/js/components/window/statistics/StatisticsArea';
import Paper from 'material-ui/Paper';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Component: StatisticsWindow', () => {

    let component;
    const store = configureStore([])({});
    const routeParams = {
        namespace: 'test',
        key: 'test',
    }

    beforeEach(() => {
        component = shallow(<StatisticsWindow params={routeParams} />);
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
