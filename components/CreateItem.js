import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION( #mutation arguments
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem( #running mutation with values passed in
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    title: 'title',
    description: 'desc',
    image: 'image',
    largeImage: 'largeimage',
    price: '5'
  }

  handleChange = e => {
    // console.log(e.target.value);
    const { name, type, value } = e.target
    console.log({ name, title, value })
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }

  render() {
    return (
        //    child of mutation component is a component or function  passing in
        // the function that calls the mutation  have access to other props from Graphql
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      
        {(createItem, { loading, error, called, data }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault()
                const res = await createItem()
                console.log(res);
              }}
            >
              <Error error={error}/>  
              <fieldset disabled={loading} aria-busy={loading}>
              {/* <fieldset disabled={true} aria-busy={true}> */}
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <button>Submit</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default CreateItem
