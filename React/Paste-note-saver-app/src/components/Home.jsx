import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/slices/pasteSlice";

function Home(){

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch()
    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36), // created new id if not present already
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            // id available then means we are updating 
            dispatch(updateToPastes(paste))
        }
        else{
            // creating
            dispatch(addToPastes(paste))
        }

        // after creation and updation
        setTitle('')
        setValue('')
        setSearchParams({})
    }

    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((paste) => paste._id === pasteId)
            console.log('Paste Found')
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])

    return(
        <div className="sm:w-7/12 px-4 mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 py-1 gap-5 mx-auto">
                
                <input type="text" 
                    placeholder="Enter Title Here"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full sm:w-[70%] p-2 rounded-2xl bg-slate-700"
                />

                <button className="sm:w-[30%]" onClick={createPaste}>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button>
            
            </div>
            <div className="mt-8">
                <textarea value={value}
                    placeholder="Enter Content Here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                    type='text'
                    className="w-full bg-slate-800 p-3 rounded-2xl"
                />
            </div>
        </div>
    )
}

export default Home