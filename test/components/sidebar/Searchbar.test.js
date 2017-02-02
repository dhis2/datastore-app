import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Searchbar } from '../../../webapp/js/components/sidebar/Searchbar';
import TextField from 'material-ui/TextField';

describe('Component: Searchbar', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Searchbar />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render TextField', () => {
        expect(component.find(TextField)).to.have.length(1);
    });
});
