import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LoadingArea from '../../../webapp/js/components/window/LoadingArea';
import { Spinner } from '../../../webapp/js/components/utils/Loaders';
import Paper from 'material-ui/Paper';

describe('Component: LoadingArea', () => {
    let component;

    beforeEach(() => {
        component = shallow(<LoadingArea />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });

    it('should render Spinner component', () => {
        expect(component.find(Spinner)).to.have.length(1);
    });
});
