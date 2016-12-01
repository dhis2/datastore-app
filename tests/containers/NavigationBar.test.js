import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NavigationBar from '../../webapp/js/containers/NavigationBar';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

describe('Component: NavigationBar', () => {
    let component;

    const testTheme = {
        primary1Color: '',
        alternateTextColor: '',
    };

    beforeEach(() => {
        component = shallow(<NavigationBar theme={ testTheme } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Toolbar', () => {
        expect(component.find(Toolbar)).to.have.length(1);
    });

    it('should render ToolbarGroup', () => {
        expect(component.find(ToolbarTitle)).to.have.length(1);
    });

});
