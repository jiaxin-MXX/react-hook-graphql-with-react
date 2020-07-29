## react 的高阶组件

> emmm网上有很多例子，但是我想自己写，以后不用到处乱找了

### useState

```js
const [state, setState] = useState(initialState);
```

> 返回一个state和一个修改state的函数，在以往我们写类组件的时候会把数据存储在state中，访问数据直接访问this.state.<名字>就可以访问到。

```js
import React , { useState } from 'react'

function UseState(props) {
    let [count , setcount] = useState({data:0})
    return (
        <>
            <div>count:{count.data}</div>
            <button onClick={()=>{
                setcount({
                    ...count,
                    data:count.data+1
                })
            }}>add count</button>
        </>
    )
}
//这样视图区域的data就会加1
```
> 注意：对象和数组都是地址的引用，所以如果让其监听到发生改变最好使用的是创建新的对象或者数组的方式，这样就不回出现data的改变然后dom并不改变的情况了。


### useEffect

> useEffect 类似于vue中的watch，它包含两个参数，第一个参数是一个回调函数，第二个参数属于一个数组，类似于监听的列表。当只存在第一个参数的时候，props改变或者任何一个useState中的值发生改变都会触发useEffect这个hooks。

```js
import React , { useState , useEffect } from 'react'

function UseState(props) {
    let [count , setcount] = useState({data:0})
    useEffect(() => {
        console.log(222)
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count.data} times`;
    },[count.data]);
    return (
        <>
            <div>count:{count.data}</div>
            <button onClick={()=>{
                setcount({
                    ...count,
                    data:count.data+1
                })
            }}>add count</button>
        </>
    )
}
```
> 当props更新and所监听的数据更新后会触发useEffect的打印

### useContext

> 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。

```js
//
import React , { useContext} from 'react'

const ColorContext = React.createContext('green')
//创建Context实例
function UseContext(props) {
    return (
        <ColorContext.Provider value={"red"}>
            <Child></Child>
        </ColorContext.Provider>
    )
}
//子组件
function Child(props) {
    return <Grand></Grand>
}
//孙子组件
function Grand(props) {
    let color = useContext(ColorContext)
    //解析对应的context实例
    console.log(color)
    return <div>color:{color}</div>
}
```
> 这种方式更方便的进行嵌套循环生成。

### useReducer

> useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

```js
import React ,{ useReducer } from "react";

let initState = {
    count : 0
}
//创建reducer方法
function reducer(state,action){
    switch (action.type) {
        case "add":
            return { count:state.count + action.count };
        case "reduce":
            return { count:state.count - action.count }
        default:
            break;
    }
    
}

function Reducer(props) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
      <>
        Count: {state.count}<br />
        <button onClick={() => dispatch({type: 'add',count:2})}>+</button>
        <button onClick={() => dispatch({type: 'reduce',count:2})}>-</button>
      </>
    );
}
```

> 对但是我害怕到时候和redux弄混，所以还是用useState

### useCallback

> 我们经常在写函数式组件或者类组件的时候可能会把属性或者方法写在标签里面，这就造成了如果父组件的props或者state改变的时候会进行重新渲染子组建的效果。比如：
```js
import React from 'react';
function Back(props) { 
    return (
        <button style={{fontSize:"20px"}} onClick={()=>console.log(111)}>useCallback</button>
    )
}

export default Back
//这样当Back的父组件的props发生改变或者是state发生改变可能就会把Back全部渲染一遍，如果是大的组件就很耗时，并不优雅
```

> 你可以通过 useCallback 获得一个记忆后的函数。第一个参数传入目标函数 ,第二个参数传入一个数组，数组中的每一项一旦值或者引用发生改变，useCallback 就会重新返回一个新的记忆函数提供给后面进行渲染。

```js
import React, { useState ,useCallback ,useMemo } from 'react';
const style = {
    fontSize:"20px"
}
function Back(props) {
    let [count,setcount] = useState(0)
    let conso  = useCallback(()=>console.log(count),[count])
    
    return (
        <>
            <button style={style} onClick={conso}>useCallback:{count}</button>
            <button style={style} onClick={()=>setcount(count+1)}>ADD</button>
        </>
    )
}

export default Back
```

> 注意，如果useCallback的第二个参数数组为空的话，他会count永远保存的一开始的状态，所以这里相关的参数一定要在数组里面

### useMemo

> useCallback 的功能完全可以由 useMemo 所取代 如下：

```js
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
```
> 唯一的区别是：useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算返回记忆组件。

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

> 当 a/b 改变时，child1/child2 才会重新渲染


### useRef

> useRef 跟 createRef 类似，都可以用来生成对 DOM 对象的引用

```js
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
```
> 这是类组件的操作：记录一下  因为平时经常忘记

```js
import React , { useRef } from "react";

function UseRef() {
    const inputEl = useRef();
    const onButtonClick = () => {
      // `current` 指向已挂载到 DOM 上的文本输入元素
      console.log(inputEl.current.value);
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>get input value</button>
      </>
    );
}
export default UseRef
```
> 函数式组件只用 useRef 之后

### useImperativeHandle

> 通过 useImperativeHandle 用于让父组件获取子组件内的索引 , useImperativeHandle 应当与 forwardRef 一起使用。

```js
import React , { useRef , useImperativeHandle , forwardRef} from "react";

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
```

### useLayoutEffect

> 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。尽可能使用标准的 useEffect 以避免阻塞视觉更新

```js
import React, { useLayoutEffect, useState, useEffect,useRef } from "react";
import ReactDOM from "react-dom";

function App() {
  const [width, setWidth] = useState(0);
  const h1Ref = useRef()
  useLayoutEffect(() => {
    const title = h1Ref.current;
    const titleWidth = title.getBoundingClientRect().width;
    console.log("useLayoutEffect",titleWidth);
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    console.log("useEffect");
  });
  console.log("render");
  return (
    <div>
      <h1 ref={h1Ref}>hello</h1>
      <h2>{width}</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

> 详细原因请看[这](https://www.cnblogs.com/iheyunfei/p/13065047.html)

### useDebugValue 

> 可用于在 React 开发者工具中显示自定义 hook 的标签。

> 本文参考简书[DC_er](https://www.jianshu.com/p/15fabae835a0)+[React—hook](https://zh-hans.reactjs.org/docs/hooks-reference.html)官网,github[地址]()