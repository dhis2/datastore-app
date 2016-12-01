import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import BreadcrumbHistoryButton from '../../webapp/js/components/utils/BreadcrumbHistoryButton';


describe('Component: NavigationBar', () => {
    let component;

    const testLabel = 'test';
    const testLast = true;

    beforeEach(() => {
        component = shallow(<BreadcrumbHistoryButton label={ testLabel } last={testLast} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render FlatButton', () => {
        expect(component.find(FlatButton)).to.have.length(1);
    });
});
