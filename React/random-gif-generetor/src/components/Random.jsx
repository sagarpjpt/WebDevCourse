import { useEffect, useState } from "react";
import axios from 'axios'
import Spinner from "./Spinner";
import useGif from "../hooks/useGif";

// const API_KEY = process.env.REACT_APP_GIPHY_API_KEY; // when using create react method
// const API_KEY = import.meta.env.VITE_GIPHY_API_KEY; 
// what is this why its outside the component function

function Random(){

    // console.log(API_KEY);

    // const [loading, setLoading] = useState(false);
    // const [gif, setGif] = useState('');

    // async function fetchData(){
    //     try{
    //         setLoading(true);
    //         const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    //         const output = await axios.get(url);
    //         const {data} = output;
    //         // console.log(data);
    //         const imageSource = data.data.images.downsized_large.url;
    //         console.log(imageSource);
    //         setGif(imageSource);
    //         setLoading(false)
    //     }catch(e){
    //         console.error('while creating gif error!')
    //     }
    // }

    // useEffect( () => {
    //     fetchData();
    // }, []); // on first render only

    const {gif, loading, fetchData} = useGif();

    function clickHandler(){
        fetchData();
    }

    // but above code should be minmal and also almost identical to other component i.e. Tag.jsx
    // hence need of custom hook just like we are using useState() etc... i.e. useGif.jsx that we created
    // below the return (---) is jsx code which can be of any length no issue
    return(
        <div className="w-1/2 mx-auto bg-white/30 mt-4 rounded-md 
        shadow-sm hover:shadow-2xl p-4 transition-all duration-200  
        backdrop-blur-lg flex flex-col justify-between items-center gap-5">

            <h1 className="text-2xl font-bold underline">Random Gif</h1>

            {
                loading ? (<Spinner />) : (
                    <img src={gif} alt="random gif displayed here" width='450' />
                )
            }

            <button onClick={clickHandler} className="text-lg px-8 py-4 bg-sky-700 text-white 
            rounded-md font-bold hover:-translate-y-1 transition-all duration-200">
                Generate
            </button>

        </div>
    )
}

export default Random;