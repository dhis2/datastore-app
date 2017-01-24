import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { HistoryDisplay } from '../../../../webapp/js/components/display/history/HistoryDisplay';
import HistoryToolbar from '../../../../webapp/js/components/display/history/HistoryToolbar';
import HistoryArea from '../../../../webapp/js/components/display/history/HistoryArea';
import Paper from 'material-ui/Paper';

describe('Component: HistoryDisplay', () => {

    let component;

    const routeParams = {
        namespace: 'test',
        key: 'test',
    }

    beforeEach(() => {
        component = shallow(<HistoryDisplay params={routeParams} />);
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
