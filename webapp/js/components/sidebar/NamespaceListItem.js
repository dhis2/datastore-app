import React, { PropTypes, Component } from 'react'


import '../../../style/sidebar/namespacelist.scss';

import { Spinner } from '../utils/Loaders';
import { OpenFolderIcon, ClosedFolderIcon, FileIcon, ErrorIcon } from '../utils/Icons';
import KeyList from './KeyList';

class NamespaceListItem extends Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);

        this.renderOpen = this.renderOpen.bind(this);
        this.renderClosed = this.renderClosed.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    renderOpen() {
      const { keys, name } = this.props.namespace, { event } = this.props;
        return (
          <li className={ 'folder' }>
            <div className={'namespace-title'} onClick={() => event(name)} >
              <span className={'folder-icon'}>
                <OpenFolderIcon />
              </span>
              <span>{ name }</span>
            </div>
            <KeyList items={ keys } namespace={ name } />
          </li>
        )
    }

    renderClosed() {
      const { name } = this.props.namespace;
      const { event } =this.props;
      return (
        <li className={ 'folder' }>
          <div className={'namespace-title'} onClick={() => event(name)} >
            <span className={'folder-icon'}>
              <ClosedFolderIcon />
            </span>
            <span>{ name }</span>
          </div>
        </li>
      )
    }

    renderLoading() {
      const { name } = this.props.namespace;
      return (
        <li className={ 'folder' }>
          <div className={'namespace-title'} >
            <span className={'folder-icon'}>
              <ClosedFolderIcon />
            </span>
            <span>{name}</span>
            <span className={ 'loading-namespace' }><Spinner /></span>
          </div>
        </li>
      )
    }

    renderError() {
      const { name } = this.props.namespace;
      return (
        <li className={ 'folder' }>
          <div className={'namespace-title'} >
            <span className={'folder-icon'}>
              <ClosedFolderIcon />
            </span>
            <span>{name}</span>
            <span className={ 'loading-namespace' }><ErrorIcon /></span>
          </div>
        </li>
      )
    }


    render() {
        const { error, fetching, open} = this.props.namespace;

        if (error) {
            return this.renderError();
        }

        if (fetching) {
            return this.renderLoading();
        }

        if (open) {
            return this.renderOpen();
        } else {
            return this.renderClosed();
        }

    }
}

export default NamespaceListItem;
