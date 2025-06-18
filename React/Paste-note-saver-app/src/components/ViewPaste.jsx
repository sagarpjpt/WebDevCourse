import { useEffect, useState } from "react"
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/slices/pasteSlice";

function ViewPaste(){

    const {id} = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter(paste => paste._id === id)[0]
    console.log('final paste: ', paste);

    return(
        <div className="flex flex-col justify-center items-center">
            <div className="w-7/12 flex justify-between items-center mt-8 py-1 gap-10 mx-auto">
                
                <input type="text" 
                    placeholder="Enter Title Here"
                    value={paste.title}
                    className="w-8/12 p-2 rounded-2xl bg-slate-700"
                    disabled
                />

                {/* <button className="w-4/12" onClick={createPaste}>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button> */}
            
            </div>
            <div className="w-7/12 mt-8">
                <textarea value={paste.content}
                    placeholder="Enter Content Here"
                    disabled
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                    type='text'
                    className="w-full bg-slate-800 p-3 rounded-2xl"
                />
            </div>
        </div>
    )
}

export default ViewPaste