import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import App from './views/App.jsx';



import client from './graphql/index'

let a = {
  a:123
}
let b = {
  b:456
}
console.log(Object.assign(a,b))

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);