import React, { PropTypes, Component } from 'react'
import  { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { Spinner } from '../utils/Loaders';

class DisplayArea extends Component {

  constructor (props) {
    super(props);

    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderObject = this.renderObject.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  renderEmpty() {
        return (
          <div>
          </div>
        )
  }

  renderObject() {
    return (
      <div>
        <JSONPretty json={this.props.value}></JSONPretty>
      </div>
    )
  }

  renderLoading() {
    const style = {
      position: 'relative',
      left: '50%',
      top: '40%'
    }
    return (
      <div style={style}>
        <Spinner size={'large'}/>
      </div>
    )
  }

  render () {
    const {value, fetching} = this.props;

    if(!value) {
      return this.renderEmpty();
    }

    if(typeof value === 'object') {
      return this.renderObject();
    }

    if(fetching) {
      return this.renderLoading();
    }

    return (
      <div>
        {String(value)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  value: state.ui.value,
  fetching: state.ui.fetching
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayArea);
