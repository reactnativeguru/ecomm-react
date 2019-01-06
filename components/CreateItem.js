import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import Router from 'next/router'

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
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = e => {
    // console.log(e.target.value);
    const { name, type, value } = e.target
    console.log({ name, title, value })
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }

  uploadFile = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'ecommapp')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/reactnativeguru/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }
  //  uploadFile =  async (e) => {
  //   console.log('uploading file')
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append('file', files[0]);
  //   data.append('upload_preset', 'ecomapp' )
  //   const res = await fetch('https://api.cloudinary.com/v1_1/reactnativeguru/image/upload', {
  //  method: 'POST',
  //   body: data
  //   });
  //   const file = await res.json();
  //   console.log(file);
  //   this.setState({
  //     image: file.secure_url,
  //     //largeImage: file.eager[0].secure_url
  //   })

  // }
  render() {
    return (
      //    child of mutation component is a component or function  passing in
      // the function that calls the mutation  have access to other props from Graphql
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called, data }) => {
          return (
            <Form
              onSubmit={async e => {
                // prevent default form submitting
                e.preventDefault()
                // run mutation
                alert(JSON.stringify(this.state))
                const res = await createItem()
                console.log(res)
                // navigate to single item created page
                Router.push({
                  pathname: '/item',
                  query: { id: res.data.createItem.id }
                })
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                {/* <fieldset disabled={true} aria-busy={true}> */}
                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    required
                    onChange={this.uploadFile}
                  />
                  {this.state.image && (
                    <img
                      width="200"
                      src={this.state.image}
                      alt="Upload Preview"
                    />
                  )}
                </label>
                <label htmlFor="title">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="price"
                    required
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
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
