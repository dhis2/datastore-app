import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class SortBar extends React.Component {
  render () {
      return (
        <div className={"sort-bar"}>
          <ul className={"sort-bar-layout"}>
            <li className={"sort-bar-item sort-bar-item-name"}>test</li>
            <li className={"sort-bar-item sort-bar-item-last-modified"}>test</li>
          </ul>
        </div>
      );
  }
}


const mapStateToProps = (state) => ({
  items: state.ui.selectedItems
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(SortBar);
