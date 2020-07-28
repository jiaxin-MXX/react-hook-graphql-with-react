import gql from 'graphql-tag'

export const insert = gql`
mutation insert($title:String!,$genres:String!,$rating:Float,$theater:Int){
    insert(title:$title,genres:$genres,rating:$rating,theater:$theater){
      title,
      genres,
      rating,
      theater
    }
}`