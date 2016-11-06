
import React, { PropTypes, Component } from 'react'
import { Glyphicon } from 'react-bootstrap';

export class OpenFolderIcon extends Component {
  render() {
    return(
      <Glyphicon glyph="glyphicon glyphicon-folder-open" />
    )
  }
}

export class ClosedFolderIcon extends Component {
  render() {
    return(
      <Glyphicon glyph="glyphicon glyphicon-folder-close" />
    )
  }
}

export class FileIcon extends Component {
  render() {
    return(
      <Glyphicon glyph="glyphicon glyphicon-file" />
    )
  }
}

export class ErrorIcon extends Component {
  render() {
    return(
      <Glyphicon glyph="glyphicon glyphicon-alert" />
    )
  }
}
