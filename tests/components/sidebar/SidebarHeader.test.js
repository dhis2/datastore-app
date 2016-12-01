import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SidebarHeader from '../../../webapp/js/components/sidebar/SidebarHeader';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Searchbar from '../../../webapp/js/components/sidebar/Searchbar';

describe('Component: SidebarHeader', () => {
    let component;

    beforeEach(() => {
        component = shallow(<SidebarHeader />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper', () => {
        expect(component.find(Paper)).to.have.length(1);
    });

    it('should render Toolbar', () => {
        expect(component.find(Toolbar)).to.have.length(1);
    });

    it('should render ToolbarGroup', () => {
        expect(component.find(ToolbarGroup)).to.have.length(1);
    });

    it('should render Searchbar', () => {
        expect(component.find(Searchbar)).to.have.length(1);
    });
});
