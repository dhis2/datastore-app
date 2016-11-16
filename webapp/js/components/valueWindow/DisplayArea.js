import React, { PropTypes, Component } from 'react'
import  { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { Spinner } from '../utils/Loaders';
import Inspector from 'react-json-inspector';
import Jsoneditor from 'jsoneditor/dist/jsoneditor-minimalist.min';
import '../../../style/vendor/json-inspector.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import Paper from 'material-ui/Paper';
import JSONEditor from './JSONEditor';

class DisplayArea extends Component {

  constructor (props) {
    super(props);

    this.state = {currJson: null};
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  initEditor() {
    const options = {
      mode: 'tree',

    }
    const editor = new Jsoneditor(this.editorContainer,options);
    return editor;
  }
  renderEmpty() {
        return (
          <div>
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

  dataFromJSONEditor(editor) {
    try { //throws error if not valid json
      var data = editor.get();
      this.setState({
        currJson: data
      });
    } catch(err) { //do something with not valid json
        console.log(err);
    }
  }

  saveData() {
    console.log("save data");
    if(this.state.currJson) {
      
      //dispatch update value to api
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
        </Paper>
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
