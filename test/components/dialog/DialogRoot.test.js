import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { NewNamespaceDialog } from '../../../webapp/js/components/dialog/NewNamespaceDialog';
import { NamespaceDialog } from '../../../webapp/js/components/dialog/NewKeyDialog';
import { ConfirmDeleteNamespaceDialog } from '../../../webapp/js/components/dialog/ConfirmDeleteNamespaceDialog';
import { ConfirmDeleteKeyDialog } from '../../../webapp/js/components/dialog/ConfirmDeleteKeyDialog';
import { DialogRoot } from '../../../webapp/js/components/dialog/DialogRoot';

describe('Component: DialogRoot', () => {
    let component;

    const testDialog = {
        dialogType: '',
        dialogprops: 'test',
    };

    const testNewNamespaceDialog = {
        dialogType: 'NEW_NAMESPACE',
        dialogprops: 'test',
    };

    const testNewKeyDialog = {
        dialogType: 'NEW_KEY',
        dialogprops: 'test',
    };

    const testConfirmDeleteNamespaceDialog = {
        dialogType: 'CONFIRM_DELETE_NAMESPACE',
        dialogprops: 'test',
    };

    const testConfirmDeleteKeyDialog = {
        dialogType: 'CONFIRM_DELETE_KEY',
        dialogprops: 'test',
    };
});
