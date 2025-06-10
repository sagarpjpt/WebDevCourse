import { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";

function Home(){

    const API_URL = 'https://fakestoreapi.com/products'
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])

    async function fetchProductData(){
        setLoading(true)

        try{
            const res = await fetch(API_URL);
            const data = await res.json();

            console.log(data);
            setItems(data);
        }
        catch(e){
            console.error('error while fetching data')
            setItems([]);
        }

        setLoading(false)
    }

    useEffect( () => {
        fetchProductData();
    },[])

    return(
        <div>
            {
                loading ? ( <Spinner /> ) : (
                    items.length > 0 ? (
                        <div className="w-9/12 max-w-6xl mx-auto
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-5">
                            {
                                items.map( (item) => {
                                    return <Product key={item.id} item={item} />
                                })
                            }
                        </div>
                    ) : ( <p>No Data Found</p> )
                )
            }
        </div>
    )
}

export default Home