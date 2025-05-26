import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignupForm({setIsLoggedIn}) {

    const [isStudent, setIsStudent] = useState(true);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        if(formData.password != formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // if account is created then user logged in
        setIsLoggedIn(true)
        toast.success('Account Created')
        const accountData = {
            ...formData
        }
        console.log('printing the account data')
        console.log(accountData);

        let accountType = isStudent ? "student" : "instructor";

        const finalData = {
            ...accountData,
            accountType: `${accountType}`
        }

        console.log(finalData);

        navigate('/dashboard')
    }

    return (
        <div className="overflow-x-hidden">
            {/* student instructor tab */}
            <div className="w-fit flex mt-6 bg-richblack-800 p-[0.25rem] rounded-full">
                <button className={`transition-all duration-200 py-2 px-5 rounded-full ${isStudent ? "bg-richblack-900" : "bg-transparent text-custom-text" }`} onClick={() => setIsStudent(true)}>Student</button>
                <button className={`transition-all duration-200 py-2 px-5 rounded-full ${isStudent ? "bg-transparent text-custom-text" : "bg-richblack-900" }`} onClick={() => setIsStudent(false)}>Instructor</button>
            </div>

            {/* form */}
            <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6 p-1">

                {/* first name and lastname div */}
                <div className="flex gap-x-4">

                    <label className="w-full">
                        <p className="text-[1rem] mb-1 leading-[1.375rem]">
                            First Name <sup className="text-red-500">*</sup>
                        </p>
                        <input
                            type="text"
                            required
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="enter your first name"
                            value={formData.firstName}
                            className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                        />
                    </label>

                    <label className="w-full">
                        <p className="text-[1rem] mb-1 leading-[1.375rem]">
                            Last Name <sup className="text-red-500">*</sup>
                        </p>
                        <input
                            type="text"
                            required
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="enter your last name"
                            value={formData.lastName}
                            className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                        />
                    </label>

                </div>

                <label className="w-full">
                    <p className="text-[1rem] mb-1 leading-[1.375rem]">
                        Email Address<sup className="text-red-500">*</sup>
                    </p>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        name="email"
                        className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                    />
                </label>

                {/* password div */}
                <div className="flex gap-x-4">

                    <label className="w-full relative">
                        <p className="text-[1rem] mb-1 leading-[1.375rem]">
                            Password<sup className="text-red-500">*</sup>
                        </p>

                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            name="password"
                            className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                        />

                        <span onClick={() => setShowPassword((prev) => !prev)} 
                            className="absolute right-3 bottom-3 text-2xl">
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>

                    <label className="w-full relative">
                        <p className="text-[1rem] mb-1 leading-[1.375rem]">
                            Confirm Password<sup className="text-red-500">*</sup>
                        </p>

                        <input
                            type={confirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
                        />

                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 bottom-3 text-2xl">
                            {confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>

                </div>

                <button className="w-full bg-amber-300 py-[8px] rounded-[8px] text-black text-md mt-6">Create Account</button>

            </form>
        </div>
    );
}

export default SignupForm;
