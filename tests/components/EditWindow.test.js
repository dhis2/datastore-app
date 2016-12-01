import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { EditWindow } from '../../webapp/js/components/window/edit/EditWindow';
import EditToolbar from '../../webapp/js/components/window/edit/EditToolbar';
import EditArea from '../../webapp/js/components/window/edit/EditArea';
import Paper from 'material-ui/Paper';

describe('Component: EditWindow', () => {

    let component;

    const routeParams = {
        namespace: 'test',
        key: 'test',
    }

    beforeEach(() => {
        component = shallow(<EditWindow params={routeParams} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });

    it('should render EmptyToolbar component', () => {
        expect(component.find(EditToolbar)).to.have.length(1);
    });

    it('should render EmptyArea component', () => {
        expect(component.find(EditArea)).to.have.length(1);
    });

});
