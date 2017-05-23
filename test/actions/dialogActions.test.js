import { expect } from 'chai';
import * as actions from '../../webapp/js/actions/dialogActions';
import * as actionTypes from '../../webapp/js/constants/actionTypes';
import * as dialogTypes from '../../webapp/js/constants/dialogTypes';

describe('dialog actions', () => {
    it('should open a namespace dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.NEW_NAMESPACE;
        const expectedAction = {
            type: actionTypes.OPEN_DIALOG,
            dialogprops,
            dialogType,
        };
        expect(actions.openDialog(dialogType, dialogprops)).to.eql(expectedAction);
    });

    it('should close a namespace dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.NEW_NAMESPACE;
        const expectedAction = {
            type: actionTypes.CLOSE_DIALOG,
        };
        expect(actions.closeDialog()).to.eql(expectedAction);
    });

    it('should open a key dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.NEW_KEY;
        const expectedAction = {
            type: actionTypes.OPEN_DIALOG,
            dialogType,
            dialogprops
        };
        expect(actions.openDialog(dialogType, dialogprops)).to.eql(expectedAction);
    });

    it('should close a key dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.NEW_KEY;
        const expectedAction = {
            type: actionTypes.CLOSE_DIALOG,
        };
        expect(actions.closeDialog()).to.eql(expectedAction);
    });

    it('should open a delete namesapce dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.CONFIRM_DELETE_NAMESPACE;
        const expectedAction = {
            type: actionTypes.OPEN_DIALOG,
            dialogprops,
            dialogType,
        };
        expect(actions.openDialog(dialogType, dialogprops)).to.eql(expectedAction);
    });

    it('should close a delete namespace dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.CONFIRM_DELETE_NAMESPACE;
        const expectedAction = {
            type: actionTypes.CLOSE_DIALOG,
        };
        expect(actions.closeDialog()).to.eql(expectedAction);
    });

    it('should open a delete key dialog', () => {
        const dialogprops = { testProps: 'testProps' };
        const dialogType = dialogTypes.CONFIRM_DELETE_KEY;
        const expectedAction = {
            type: actionTypes.OPEN_DIALOG,
            dialogprops,
            dialogType,
        };
        expect(actions.openDialog(dialogType, dialogprops)).to.eql(expectedAction);
    });

    it('should close a delete key dialog', () => {
        const dialogType = dialogTypes.CONFIRM_DELETE_KEY;
        const expectedAction = {
            type: actionTypes.CLOSE_DIALOG,
        };
        expect(actions.closeDialog()).to.eql(expectedAction);
    });
});
