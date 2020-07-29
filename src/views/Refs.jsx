import React, { Component , createRef } from 'react';

class Refs extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef()
    }
    onButtonClick=()=>{
        console.log(this.myRef.current.value)
    }
    render() {
        return (
            <>
                <input ref={this.myRef} type="text" />
                <button onClick={this.onButtonClick}>get input value</button>
            </>
        );
    }
}

export default Refs;