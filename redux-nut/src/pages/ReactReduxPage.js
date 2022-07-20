import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default connect(
  // mapStateToProps,
  (state, ownProps) => {
    console.info(ownProps)
    return state;
  }
/*   ({count}) => ({
    count
  }) */
  //mapDispatchToProps
  /* ,{
    add: () => ({type: 'ADD'})
  } */
  ,(dispatch) => {
    let creators = {
      add: () => ({type: 'ADD'})
    }

    creators = bindActionCreators(creators)
    return ({
      dispatch,
      ...creators
    })
  }
)(class ReactReduxPage extends Component {

  render() {
    const {count, dispatch} = this.props;
    console.info(this.props)
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <button onClick={()=>{dispatch({type: 'ADD'})}}>dispatch: {count}</button>
        <button onClick={()=>{dispatch({type: 'ADD'})}}>add: {count}</button>
      </div>
    )
  }
})
