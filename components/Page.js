import React, { Component } from 'react'
import Meta from './Meta';
import Header from './Header';
import Nav from './Nav';

export default class Page extends Component {
  render() {
    return (
      <div>
      <Meta/>
      <Nav/>
      <Header/>
        {this.props.children}
      </div>
    )
  }
}
