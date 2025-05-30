import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import axios from 'axios'
import useGif from "../hooks/useGif";

// const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

function Tag(){

    // console.log(API_KEY);

    const [tag, setTag] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [gif, setGif] = useState('');

    // async function fetchData(){
    //     try{
    //         setLoading(true);
    //         const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
    //         const output = await axios.get(url);
    //         const {data} = output;
    //         console.log(data);
    //         const imageSource = data.data.images.downsized_large.url;
    //         console.log(imageSource);
    //         setGif(imageSource);
    //         setLoading(false);
    //     }catch(e){
    //         console.error('while creating gif error!')
    //     }
    // }

    // useEffect( () => {
    //     fetchData();
    // }, []); // on first render only

    const {gif, loading, fetchData}  = useGif();

    function clickHandler(){
        fetchData(tag);
    } 

    function changeHandler(event){
        setTag(event.target.value)
    }

    return(
        <div className="w-1/2 mx-auto bg-white/30 mt-8 rounded-md 
        shadow-sm hover:shadow-2xl p-4 transition-all duration-200 
        backdrop-blur-lg flex flex-col justify-between items-center gap-5">

            <h1 className="text-2xl font-bold underline">Search Gif: {tag} </h1>

            {
                loading ? (<Spinner />) : (
                    <img src={gif} alt="random gif displayed here" width='450' />
                )
            }

            <form className="flex flex-col gap-3 w-full items-center" onSubmit={(event) => event.preventDefault() }>

                <input type="text" className="bg-white py-3 rounded-md w-full p-3"
                    onChange={changeHandler}
                    value={tag}    
                />

                <button onClick={clickHandler} className="text-lg px-8 py-4 bg-sky-700 text-white 
                rounded-md font-bold hover:-translate-y-1 transition-all duration-200 w-fit">
                    Generate
                </button>

            </form>

        </div>
    )
}

export default Tag;