import React , { Component } from 'react'
import { Mutation } from 'react-apollo'
import { insert } from '../graphql/mutations/index'
class Mutations extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Mutation mutation={insert}>
                {
                    (data)=>{
                        console.log(data)
                        return(
                            <p>mutation</p>
                        )
                    }
                }
            </Mutation>
        );
    }
}

export default Mutations;