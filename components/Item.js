import React, { Component } from "react";
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Link from 'next/link';
import formatMoney from "../lib/formatMoney"
import DeleteItem from "./DeleteItem";
class Item extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    };


    render() {
        const {item} = this.props;
        return (
            <ItemStyles >
              {item.image && <img src={item.image}/> }
                    <Link href={{
                        pathname:'/item',
                        query: {id: item.id}
                    }}>
                        <a key={item.id}>{item.title}</a>
                    </Link>
                <PriceTag>{formatMoney(item.price)}</PriceTag>
                <p>{item.description}</p>
                <div className="buttonList">
                    <Link href={{
                        pathname: 'update',
                        query:{ id: item.id}
                        }}>
                        <a>Edit</a> 
                    </Link>
                    <button>Add to cart</button>
                    <DeleteItem id={item.id}>Delete this item</DeleteItem>
                </div>
            </ItemStyles>
        );
    }
}
export default Item;
