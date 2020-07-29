import React, { useState , useRef ,useEffect} from 'react';
import { useLazyQuery } from '@apollo/client';
import { hello } from '../graphql/queries/index'

function Args(props) {
    const inputRef = useRef()
    let [ title , settitle ] = useState()
    let [gettitle,{loading,data}] = useLazyQuery(hello)
    
    const send = () =>{
        gettitle({ variables: { name: inputRef.current.value } })
    }
    useEffect(()=>{
        if(data && data.hello){
            settitle(data.hello)
        }
    },[data])
    if (loading) return <p>Loading ...</p>
    return (
        <>
            <div>{title}</div>
            <input ref={inputRef} /><button  onClick={send}>send title</button>
        </>
    )
}

export default Args