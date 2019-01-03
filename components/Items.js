import React, { Component } from "react";
import {Query} from 'react-apollo'
import gql from 'graphql-tag';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items{
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;


class Items extends Component {
    render() {
        return (
            <div>
                <p>Items</p>
                // recommended way to get data is to use render props function with Query Component
                <Query query={ALL_ITEMS_QUERY}>
                    {(payload) => {
                        console.log(payload);
                        return <p>data</p>
                    } }
                </Query>
            </div>
        );
    }
}
export default Items;
