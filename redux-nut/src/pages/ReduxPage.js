import React, { Component } from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    console.info(store)
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        // console.log("now ", getState()); //sy-log
        dispatch({type: "ADD", payload: 1});
      }, 1000);
    });
  };

  add = () => {
    store.dispatch({type: "ADD"});
  };
  minus = () => {
    store.dispatch({type: "MINUS"});
  };
  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100
      })
    );
  };
  render() {
    console.log("store", store); //sy-log
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.promiseMinus}>promiseMinus</button>
      </div>
    );
  }
}