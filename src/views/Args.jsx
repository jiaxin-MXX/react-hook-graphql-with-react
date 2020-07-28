import React, { Component } from 'react';
import { Query } from "react-apollo";
import { hello } from '../graphql/queries/index'
class Args extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }
    render() {
        return (
            <Query query={ hello } variables={{name:"贾鑫"}}>
                {
                    ({loading,data})=>{
                        console.log(data)
                        return (
                            !loading && <p>{data.hello}</p>
                        )
                    }
                }
            </Query>
        );
    }
}

export default Args;