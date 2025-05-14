import { useState } from 'react';
import './ProductForm.css'


function ProductForm(props) {

    const [newTitle, setTitle] = useState('')
    const [newDate, setDate] = useState('')

    function titleChangeHandler(event){
        setTitle(event.target.value)
    }

    function dateChangeHandler(event){
        setDate(event.target.value)
        // console.log(title)
        // console.log(date)
    }

    function submitHandler(e) {
        e.preventDefault(); //now on clicking add product btn no refresh of page
        const productData = {
            title:newTitle,
            date: newDate
        };
        // console.log(productData);
        props.onSaveProduct(productData);

        // now again after getting data as object
        setTitle('')
        setDate('')
        
    }

    // const [fullProductInput, setfullPorductInput] = useState({
    //     title:'',
    //     date:''
    // })

    // function setfullPorductInput(even, prevState){
    //     // return object with updated parameter
    //     return {...prevState, title:event.target.value};
    // }

    // function titleChangeHandler(event, prevState){
    //     let obj = {...prevState, title:event.target.value};
    //     console.log(obj);
    //     return obj;
    // }

    // function dateChangeHandler(event) {

    // }

    return (

        <form onSubmit={submitHandler}>

            <div className='new-product-title'>
                <label>Title</label>
                <input type = "text" onChange={titleChangeHandler} value={newTitle}></input>
            </div>

            <div className='new-product-date'>
                <label>Date</label>
                <input type = 'date' 
                min='2023-01-01' max='2023-12-12' onChange={dateChangeHandler} 
                value={newDate}></input>
            </div>

            <div className='new-product-button'>
                <button type='submit'>Add Product</button>
            </div>

        </form>
    )

}

export default ProductForm