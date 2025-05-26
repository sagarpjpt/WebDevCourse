import { useState } from "react"
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function LoginForm({setIsLoggedIn}) {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function changeHandler(event) {
        setFormData( (prevData) => ({
            ...prevData, 
            [event.target.name]: event.target.value
        }))
    }

    function submitHandler(event) {
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success('Logged In');
        console.log('printing user credentials')
        console.log(formData);
        navigate('/dashboard')
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6 p-1">

                <label className="w-full">

                    <p className="text-[1rem] mb-1 leading-[1.375rem]">Email Address<sup className="text-red-500">*</sup></p>
                    <input type="email" 
                        required
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        name="email"
                        className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                    />

                </label>

                <label className="w-full relative">

                    <p className="text-[1rem] mb-1 leading-[1.375rem]">Password<sup className="text-red-500">*</sup></p>

                    <input type={showPassword ? ("text") : ("password")}
                        required
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="enter password"
                        name="password"
                        className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                    />

                    <span onClick={() => setShowPassword( (prev) => !prev ) } 
                        className="absolute right-5 bottom-9 text-2xl">
                        { showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>) }
                    </span>

                    <Link to='/'>
                        <p className="text-right text-[0.85rem] leading-[1.375rem] text-custom-text-2 mt-1">
                            Forget Password?
                        </p>
                    </Link>

                </label>

                <button className="w-full bg-amber-300 py-[8px] rounded-[8px] text-black text-md mt-6 font-bold">Sign In</button>

            </form>
        </div>
    )
}

export default LoginForm