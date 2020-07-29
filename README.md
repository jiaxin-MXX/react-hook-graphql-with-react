## react结合Graphql

### 安装依赖

```js
yarn add @apollo/client graphql
```

> 注意 使用@apollo/client之后，当前组件必定是一个函数式组件，否则会报错

### 创建实例

```js
import { ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})
export default client
```

### 通过 ApolloProvider 到 React

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import App from './views/App.jsx';

import client from "./graphql/index.js";
console.log(client)
ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
  document.getElementById('root')
);
```

### 使用

- 查询：

> 这里有两种，一种是带参数的，第二种属于不带参数的查询：

```js
//不带参数的查询
//query的index文件
import gql from 'graphql-tag'
export let movieList = gql`
query Movie {
    movies{
      id
      title
      genres
      rating
    }
}
`
//App.jsx文件
import React , { Fragment }from 'react'
import { useQuery } from '@apollo/client';
import {movieList} from '../graphql/queries/index'
function App() {
const { loading, data, refetch } = useQuery(movieList);
console.log(data)
  return (
    <>
        <div>
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
        </div>
        <button onClick={()=>refetch()}>更新</button>
    </>
  )
}
export default App;
```
> 带参数并且和手动发送请求：

```js
//query的index文件
import gql from 'graphql-tag'
export let hello = gql`query ($name:String){
    hello(name:$name)
}`
//Args.js文件
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
// 这里我们输入input的值之后点击发送会自动出现  hello world xxx
```

- 变更

> 变更操作主要是增删改的操作，相对应schema的mutation字段

```js
//mutations下的index文件
import { gql } from '@apollo/client';
export const insert = gql`
mutation insert($title:String!,$genres:String!,$rating:Float,$theater:Int){
    insert(title:$title,genres:$genres,rating:$rating,theater:$theater){
      title,
      genres,
      rating,
      theater
    }
}`
//Mutation.jsx
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
//这里目前来说是没有什么要说的点。。还没有遇到高危操作
```