
import React, { PropTypes, Component } from 'react'
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import FileFolder from 'material-ui/svg-icons/file/folder';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import AlertError from 'material-ui/svg-icons/alert/error';

const iconStyles = {
  marginTop: 10,
  marginRight: 12
};

export class OpenFolderIcon extends Component {
  render() {
    return(
      <FileFolderOpen style={iconStyles} />
    )
  }
}

export class ClosedFolderIcon extends Component {
  render() {
    return(
      <FileFolder />
    )
  }
}

export class FileIcon extends Component {
  render() {
    return(
      <EditorInsertDriveFile style={iconStyles} />
    )
  }
}

export class ErrorIcon extends Component {
  render() {
    return(
      <AlertError style={iconStyles} />
    )
  }
}
