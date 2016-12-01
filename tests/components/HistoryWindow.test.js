import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { HistoryWindow } from '../../webapp/js/components/window/history/HistoryWindow';
import HistoryToolbar from '../../webapp/js/components/window/history/HistoryToolbar';
import HistoryArea from '../../webapp/js/components/window/history/HistoryArea';
import Paper from 'material-ui/Paper';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Component: HistoryWindow', () => {

    let component;

    const routeParams = {
        namespace: 'test',
        key: 'test',
    }

    beforeEach(() => {
        component = shallow(<HistoryWindow params={routeParams} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });

    it('should render EmptyToolbar component', () => {
        expect(component.find(HistoryToolbar)).to.have.length(1);
    });

    it('should render EmptyArea component', () => {
        expect(component.find(HistoryArea)).to.have.length(1);
    });

});
