import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DisplayToolbarTitle from '../../../webapp/js/components/display/DisplayToolbarTitle';
import BreadcrumbHistoryButton from '../../../webapp/js/components/utils/BreadcrumbHistoryButton';

describe('Component: DisplayToolbarTitle', () => {
    let component;

    beforeEach(() => {
        component = shallow(<DisplayToolbarTitle path={'namespace/key'} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

      it('should render one BreadcrumbHistoryButton components', () => {
          component = shallow(<DisplayToolbarTitle path={'namespace'} />);
          expect(component.find(BreadcrumbHistoryButton)).to.have.length(1);
      });

    it('should render two BreadcrumbHistoryButton components', () => {
        expect(component.find(BreadcrumbHistoryButton)).to.have.length(2);
    });
});
