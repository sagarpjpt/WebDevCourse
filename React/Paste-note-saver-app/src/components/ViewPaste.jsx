
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";


function ViewPaste(){

    const {id} = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter(paste => paste._id === id)[0]
    console.log('final paste: ', paste);

    return(
        <div className="sm:w-7/12 px-4 mx-auto">
            <div className="mt-8 py-1 gap-5 mx-auto">
                
                <input type="text" 
                    placeholder="Enter Title Here"
                    value={paste.title}
                    className="w-full p-2 rounded-2xl bg-slate-700"
                    disabled
                />
            
            </div>

            <div className="mt-8">
                <textarea value={paste.content}
                    placeholder="Enter Content Here"
                    disabled
                    rows={20}
                    type='text'
                    className="w-full bg-slate-800 p-3 rounded-2xl"
                />
            </div>
        </div>
    )
}

export default ViewPaste