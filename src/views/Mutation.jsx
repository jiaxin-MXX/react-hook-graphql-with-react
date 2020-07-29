import React from 'react'
import { useMutation } from '@apollo/client';
import { insert } from '../graphql/mutations/index'
function Mutations(){
    let [insertData, {data}] = useMutation(insert)
    console.log(data)
    return(
        <button onClick={()=>insertData({ variables: {title:"英伦对决2",genres:"悬疑2",rating:8.8,theater:6} })}>add</button>
    )
}
export default Mutations;