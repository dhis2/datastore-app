import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';

class AboutPage extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }


  render () {
    return (
      <div className="jumbotron">
        <h1>About Page</h1>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({

})

export default connect(mapStateToProps, {

})(AboutPage);
