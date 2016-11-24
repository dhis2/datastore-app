import React, { PropTypes, Component } from 'react'
import  { connect } from 'react-redux';
import JSONEditor from './JSONEditor';
import AppContainer from '../../containers/AppContainer'
import { updateValue, valueChange } from '../../actions/actions'
import { ModeCommentIconWithText } from '../utils/Icons';
import Paper from 'material-ui/Paper';
import '../../../style/valueWindow/valueWindow.scss';

import BrowserList from '../utils/BrowserList';
import BrowserListRow from '../utils/BrowserListRow';

class BrowserArea extends Component {
    render () {
      return (
        <BrowserList>

        </BrowserList>
      )
    }
}

export default BrowserArea;
