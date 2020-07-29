import React , { useState,useEffect,useContext} from 'react'

import { ColorContext } from "../context/index";

function UseState(params) {
    let [count , setcount] = useState({data:0})
    useEffect(() => {
        console.log(222)
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count.data} times`;
    },[count.data]);
    return (
        <ColorContext.Provider value={"red"}>
            <div>count:{count.data}</div>
            <button onClick={()=>{
                setcount({
                    ...count,
                    data:count.data+1
                })
            }}>add count</button>
            <Child></Child>
        </ColorContext.Provider>
    )
}


function Child(params) {
    return <Grand></Grand>
}


function Grand(params) {
    let color = useContext(ColorContext)
    console.log(color)
    return <div>color:{color}</div>
}
export default UseState

// useState完美解决了函数组件中data的问题，但是注意，对象和数组都是地址的引用，所以如果让其监听到发生改变最好使用的是创建新的对象或者数组的方式，这样就不回出现data的改变然后dom并不改变的情况了。


// useEffect 类似于vue中的watch，它包含两个参数，第一个参数是一个回调函数，第二个参数属于一个数组，类似于监听的列表。
// 当只存在第一个参数的时候，props改变或者任何一个useState中的值发生改变都会触发useEffect这个hooks。