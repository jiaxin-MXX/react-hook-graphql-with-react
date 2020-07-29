import React ,{ useReducer } from "react";

let initState = {
    count : 0
}

function reducer(state,action){
    switch (action.type) {
        case "add":
            return { count:state.count + action.count };
        case "reduce":
            return { count:state.count - action.count }
        default:
            break;
    }
    
}

function Reducer(props) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
      <>
        Count: {state.count}<br />
        <button onClick={() => dispatch({type: 'add',count:2})}>+</button>
        <button onClick={() => dispatch({type: 'reduce',count:2})}>-</button>
      </>
    );
}

export default Reducer