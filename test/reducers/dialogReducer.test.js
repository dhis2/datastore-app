import { expect } from 'chai';
import reducer from '../../webapp/js/reducers/dialogReducer';

const emptyDialog = { type: null, props: {} };

describe('Dialog Reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            ...emptyDialog,
        };
    });

    it('should handle any action', () => {
        const action = { type: 'SELECT_KEY' };
        const newState = reducer(initialState, action);
        expect(newState).to.eql(initialState);
    })

    it('Should handle OPEN_DIALOG', () => {
        const action = {
            type: 'OPEN_DIALOG',
            dialogType: 'some type',
            dialogprops: 'some props',
        };

        const expectedResult = {
            type: 'some type',
            props: 'some props',
        };

        const newState = reducer(initialState, action);
        expect(newState).to.eql(expectedResult);
    });

    it('Should handle CLOSE_DIALOG', () => {
        const newState = reducer(initialState, { type: 'CLOSE_DIALOG' });
        expect(newState).to.eql(emptyDialog);
    });
});
