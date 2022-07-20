import React, { useReducer } from 'react';
import { countReducer } from '../store';


function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, 0)
  return (
    <div>
      <h3>Hook Page</h3>
      <button onClick={()=>{dispatch({type: 'ADD'})}}>{state}</button>
    </div>
  );
}

export default HooksPage;