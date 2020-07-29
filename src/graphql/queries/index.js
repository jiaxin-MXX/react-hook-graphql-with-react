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

export let hello = gql`
query hello($name:String){
  hello(name:$name)
}
`