import React , { useRef,useImperativeHandle,forwardRef} from "react";

function Child(props,ref){
    const temRef = useRef()
    useImperativeHandle(ref, () => temRef.current);
    return (
        <>
            <input ref={temRef}></input>
        </>
    )
}

const ChildInput = forwardRef(Child)

function Parent(){
    let inputRef = useRef()
    const getValue = ()=>{
        console.log(inputRef.current.value)
    }
    return (
        <>
            <ChildInput ref={inputRef} />
            <button onClick={getValue}>get value</button>
        </>
    )

}

export default Parent