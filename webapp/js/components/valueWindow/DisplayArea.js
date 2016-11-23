import React, { PropTypes, Component } from 'react'
import  { connect } from 'react-redux';
import { Spinner } from '../utils/Loaders';
import '../../../style/vendor/json-inspector.css';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import JSONEditor from './JSONEditor';
import ModeComment from 'material-ui/svg-icons/editor/mode-comment';
import AppContainer from '../../containers/AppContainer'
import {updateValue, valueChange } from '../../actions/actions'

class DisplayArea extends Component {

  constructor (props) {
    super(props);

    this.state = {
      snackbarOpen: false
    };
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }


  renderLoading() {
    const style = {
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <div className="value-area"   style={style}>
        <Spinner size={'large'}/>
      </div>
    )
  }

  dataFromJSONEditor(editor) {
    const {namespace, selectedKey } = this.props;
    try { //throws error if not valid json
      var data = editor.get();
      this.props.valueChange(namespace,selectedKey,data)
    } catch(err) { //do something with not valid json, dispatch rejectedValueChange
        console.log(err);
    }
  }


  handleSnackbarClose() {
    this.setState({
        ...this.state,
        snackbarOpen: false
    })
  }

  renderEmpty() {
    const style = {
      alignItems: 'center',
      justifyContent: 'center'
    }
    const iconStyle = {
      fill: 'rgb(117, 117, 117)',
      display:'block',
      margin:'0 auto 0 auto',
      width:'100px',
      height:'auto'
    }
    return (
        <div className="value-area" style={style}>
          <div>
            <ModeComment style={iconStyle}/>
            <p>Select a namespace and a key to edit.</p>
          </div>
        </div>
    )
  }

  componentWillReceiveProps() {
    if (this.props.updateError) {
      this.setState({
        snackbarOpen: true
      });
    }
  }

  render () {
    const {value, fetching} = this.props;

    if(fetching) {
      return this.renderLoading();
    }

    if(!value) {
      return this.renderEmpty();
    }

    return (
        <div className="value-area" style={{backgroundColor:AppContainer.theme.palette.primary3Color}}>
          <JSONEditor value={this.props.value} dataChanged={this.dataFromJSONEditor.bind(this)}/>
          <Snackbar
              open={this.state.snackbarOpen}
              message="Failed to update"
              autoHideDuration={4000}
              onRequestClose={this.handleSnackbarClose.bind(this)}
          />
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  value: state.ui.value,
  namespace: state.ui.namespace,
  selectedKey: state.ui.key,
  fetching: state.ui.fetching,
  updateError: state.ui.updateError
})

const mapDispatchToProps = (dispatch) => ({
  updateValue(namespace,key,value) {
    dispatch(updateValue(namespace,key,value))
  },
  valueChange(namespace,key,value) {
    dispatch(valueChange(namespace,key,value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayArea);
