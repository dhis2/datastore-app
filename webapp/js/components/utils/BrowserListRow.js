import React, { PropTypes, Component } from 'react'
import FileFolder from 'material-ui/svg-icons/file/folder';


class BrowserListRow extends Component {
  render () {
    return (
      <li className={"detailed-list-item"}>
        <span className={"d-l-i d-l-name"}>test</span>
        <span className={"d-l-i d-l-last-modified"}>test</span>
      </li>
    )
  }
}

export default BrowserListRow;
