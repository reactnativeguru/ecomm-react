import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`
export default class DeleteItem extends Component {
  render () {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
      >
        {(deleteItem, { error }) =>  (
            <button onClick={() => {
                    if(confirm('Sure to delete?')){
                        deleteItem()
                    }
            }}>
            {this.props.children}
            </button>
            
        )}
       
      </Mutation>
    )
  }
}
