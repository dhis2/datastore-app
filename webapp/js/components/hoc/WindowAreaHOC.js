import React, {PropTypes, Component} from 'react'
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import ContentSave from 'material-ui/svg-icons/content/save';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import LoadingArea from '../window/LoadingArea';

import '../../../style/valueWindow/valueWindow.scss';


const WindowAreaHOC = (Area, loading, error) => class extends Component {

    constructor(props) {
        super(props);

        this.renderLoading = this.renderLoading.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    renderLoading() {
      return <LoadingArea />
    }

    renderError() {
      return (
        <div></div>
      );
    }

    render() {

      console.log(loading);

      if (loading) {
        return this.renderLoading();
      }

      if (error) {
        return this.renderError();
      }

      return (
        <Area />
      )
    }
}

export default WindowAreaHOC;
