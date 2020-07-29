import React, { useState ,useCallback ,useMemo } from 'react';
const style = {
    fontSize:"20px"
}
function Back(props) {
    let [count,setcount] = useState(0)
    let conso  = useMemo(()=>()=>console.log(count),[count])
    
    return (
        <>
            <button style={style} onClick={conso}>useCallback:{count}</button>
            <button style={style} onClick={()=>setcount(count+1)}>ADD</button>
        </>
    )
}

export default Back