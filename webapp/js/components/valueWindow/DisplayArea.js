import React, { PropTypes, Component } from 'react'
import  { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { Spinner } from '../utils/Loaders';
import Inspector from 'react-json-inspector';
import Jsoneditor from 'jsoneditor/dist/jsoneditor-minimalist.min';
import '../../../style/vendor/json-inspector.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import JSONEditor from './JSONEditor';
import {updateValue } from '../../actions/actions'

class DisplayArea extends Component {

  constructor (props) {
    super(props);

    this.state = {
      currJson: null,
      snackbarOpen: false
    };
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
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

  dataFromJSONEditor(editor) {

    try { //throws error if not valid json
      var data = editor.get();
      this.setState({
        currJson: data
      });
    } catch(err) { //do something with not valid json
        console.log(err);
    }
    console.log(this.props)
    console.log(this.state);
  }

  saveData() {
    console.log("save data");
    if(this.state.currJson) {
      //dispatch update value to api
      console.log(this.props);
      const {namespace, selectedKey, value } = this.props;
      this.props.updateValue(namespace, selectedKey , value);
    }
  }

  handleSnackbarClose() {
    this.setState({
        ...this.state,
        snackbarOpen: false
    })
  }

  renderEmpty() {
    return (
        <div>
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
    if(!value) {
      return this.renderEmpty();
    }

    if(fetching) {
      return this.renderLoading();
    }

    return (
        <Paper className="value-area">
          <FloatingActionButton onClick={this.saveData.bind(this)}>
            <ContentSave />
            </FloatingActionButton>
          <JSONEditor value={this.props.value} dataChanged={this.dataFromJSONEditor.bind(this)}/>
          <Snackbar
              open={this.state.snackbarOpen}
              message="Failed to update"
              autoHideDuration={4000}
              onRequestClose={this.handleSnackbarClose.bind(this)}
          />
        </Paper>
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayArea);
