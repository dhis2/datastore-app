import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppContainer from '../../../webapp/js/components/app/AppContainer';

describe('Component: AppContainer', () => {
    let component;
    const store = configureStore([thunk])({});

    beforeEach(() => {
        component = shallow(<AppContainer store={ store } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
