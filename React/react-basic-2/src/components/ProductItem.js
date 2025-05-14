import {useState} from 'react';

import Card from './Card'
import ProductDate from './ProductDate'
import './ProductItem.css'

const ProductItem = (props) => {

    const [title, setTitle] = useState(props.title);

    // let title = props.title;

    function clickHandler(){
        setTitle('Popcorn')
        console.log('button clicked');
    }

    return(
        <Card className="product-item">
            <ProductDate date={props.date} />
            <div className='product-item-description'>
                <h2>{title}</h2>
            </div>
            <button onClick={clickHandler} 
            className='product-item-btn'>Add To Cart</button>
        </Card>
    )
}

export default ProductItem;