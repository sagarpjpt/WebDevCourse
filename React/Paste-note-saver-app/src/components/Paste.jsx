import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/slices/pasteSlice";
import { toast } from 'react-hot-toast';
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [serachTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
//   const navigate = Navigate();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(serachTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="w-[600px] mx-auto flex flex-col justify-center items-center">
      <input
        type="serach"
        placeholder="Search Here..."
        value={serachTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded-2xl w-full mt-8 bg-slate-700"
      />

      <div className="w-full mt-10 text-center">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste._id} className="relative border-2 my-5 p-4 w-full">
                <div className="absolute w-20 h-3 bg-white -top-3 -left-0.5"></div>
                <div className="uppercase text-lg font-bold">{paste.title}</div>
                <div className="my-1 bg-slate-700 p-3 rounded-lg">
                    <span className="font-bold text-2xl">" </span>
                        {paste.content}
                    <span className="font-bold text-2xl"> "</span>
                </div>
                <div className="flex gap-3 justify-between my-4">
                  
                  <NavLink to={`/?pasteId=${paste?._id}`}>                    
                    <button>Edit</button>
                  </NavLink>
                  
                  <NavLink to={`/pastes/${paste?._id}`}>
                    <button>View</button>                    
                  </NavLink>
                  
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                        .then(() => {
                          toast.success("Content copied to clipboard!");
                        })
                        .catch((err) => {
                          toast.error("Failed to copy: ", err);
                        });
                    }}
                  >
                    Copy
                  </button>
                  
                  <button
                    onClick={() => {
                        console.log(location)
                        const BaseUrl = window.location.origin;
                        console.log(BaseUrl)
                        const shareUrl = `${BaseUrl}/?pasteId=${paste?._id}`
                        navigator.clipboard.writeText(shareUrl)
                        .then(() => toast.success("Copied Url!"))
                        .catch((err) => toast.error("Copy failed", err));
                    }}
                  >
                    Share
                  </button>

                </div>

                <div>{paste.createdAt}</div>

              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Paste;
