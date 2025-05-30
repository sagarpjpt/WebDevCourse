import { useState, useEffect } from "react";
// import Spinner from "..components/Spinner";
import axios from 'axios'

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

function useGif(){
    
    const [loading, setLoading] = useState(false);
    const [gif, setGif] = useState('link');

    async function fetchData(tag){
        try{
            setLoading(true);

            const output = await axios.get( tag ? `${url}&tag=${tag}` : url );
            
            const {data} = output;
            console.log(data);
            
            const imageSource = data.data.images.downsized_large.url;
            console.log(imageSource);
            
            setGif(imageSource);
            setLoading(false);

        }catch(e){
            console.error('while creating gif error!')
        }
    }

    useEffect( () => {
        fetchData();
    }, []); // on first render only

    // also didnt need any click handlers function here

    // didnt need jsx ie. return() code in custom hooks

    // now what this hook returns
    return { 
        gif, loading, fetchData
    }

}

export default useGif