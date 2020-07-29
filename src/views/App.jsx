import React from 'react'
import Arg from "./Args";
import Refs from "./Refs";
import Mutation from './Mutation.jsx'
import { useQuery } from '@apollo/client';
import {movieList} from '../graphql/queries/index'


import Back from "../hooks/Back";
import UseRef from "../hooks/UseRef";
import State from "../hooks/State";
import Redurce from "../hooks/Redurce";
import Imperative from "../hooks/Imperative";
function App() {
const { data, refetch } = useQuery(movieList);
console.log(data)
  return (
    <>
        {/* <div>
        {
             !loading &&
             data.movies.map(item => (
                 <Fragment key={item.id}>
                     <li>
                         <br/>
                         id:{item.id}<br/>
                         title:{item.title}<br/>
                         genres:{item.genres}<br/>
                         rating:{item.rating}<br/>
                     </li>
                     <br/>
                 </Fragment>
             ))
        }
        </div> */}
        <button onClick={()=>refetch()}>更新</button>
        <Arg></Arg>
        <Mutation></Mutation>
        <State />
        <Redurce></Redurce>
        <Back></Back>
        <UseRef></UseRef>
        <Refs></Refs><br />
        <Imperative></Imperative>
    </>
  )
}
export default App;