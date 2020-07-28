import React , { Fragment }from 'react'
import { Query } from "react-apollo";
import {movieList} from '../graphql/queries/index'
import Arg from './Args'
import Mutation from './Mutation'
function App() {
  return (
    <>
        <Query query={movieList}>
        {({ loading, error, data }) => {
            console.log(data)
            return (
            <>
                {!loading &&
                data.movies.map(item => (
                    <Fragment key={item.id}>
                        <li>
                            <br/>
                            id:{item.id}<br/>
                            title:{item.title}<br/>
                            genres:{item.genres}<br/>
                            rating:{item.rating}<br/>
                            theater:{item.theater}<br/>
                        </li>
                        <br/>
                    </Fragment>
                ))}
            </>
            );
        }}
        </Query>
        <Arg></Arg>
        <Mutation></Mutation>
    </>
  )
}
export default App;