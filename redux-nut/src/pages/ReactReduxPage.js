import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../react-redux-nut';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from '../redux-nut';

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
/*   ,{
    add: () => ({type: 'ADD'})
  } */
  ,(dispatch) => {
    let creators = {
      add: () => ({type: 'ADD'}),
      minus: () => ({type: 'MINUS'})
    }

    creators = bindActionCreators(creators, dispatch)
    console.info(creators)
    return ({
      dispatch,
      ...creators
    })
  }
)(class ReactReduxPage extends Component {

  render() {
    const {count, dispatch, add} = this.props;
    console.info(this.props)
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <button onClick={()=>{dispatch({type: 'ADD'})}}>dispatch: {count}</button>
        <button onClick={add}>add: {count}</button>
      </div>
    )
  }
})
