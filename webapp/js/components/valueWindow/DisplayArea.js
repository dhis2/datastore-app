import React, { PropTypes, Component } from 'react'
import  { connect } from 'react-redux';
import JSONPretty from 'react-json-pretty';
import { Spinner } from '../utils/Loaders';
import Inspector from 'react-json-inspector';
import Jsoneditor from 'jsoneditor/dist/jsoneditor-minimalist.min';
import '../../../style/vendor/json-inspector.css';
import Paper from 'material-ui/Paper';
import JSONEditor from './JSONEditor';

class DisplayArea extends Component {

  constructor (props) {
    super(props);

    this.editor = null;
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderObject = this.renderObject.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
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

  renderObject() {
    return (
      <Paper className="value-area">
        <JSONEditor/>
      </Paper>
    )
  }

  renderEditor() {

    return (
        <Paper className="value-area">
          <JSONEditor value={this.props.value}/>
        </Paper>
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

 /*   if(typeof value === 'object') {
      return this.renderEditor();
    } */

    if(fetching) {
      return this.renderLoading();
    }
    return this.renderEditor();
    return (
        <Paper className="value-area">
          <div className="value-value">
          {String(value)}
            </div>
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
