import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/profileSlice"; // update path
import { apiConnector } from "../../../services/apiConnector"; // or where you put it
import { auth } from "../../../services/apis";

function LoginForm({ setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      setLoading(true);
      // POST to backend login route
      const res = await apiConnector("POST", auth.LOGIN_API, {
        email: formData.email,
        password: formData.password,
      });

      if (res?.data?.success) {
        // backend returns user object, browser stores cookie automatically
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Logged In");
        navigate("/");
      } else {
        toast.error(res?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = err?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
        setLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4 mt-6 p-1"
      >
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

        <label className="w-full relative">
          <p className="text-[1rem] mb-1 leading-[1.375rem]">
            Password<sup className="text-red-500">*</sup>
          </p>

          <input
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={changeHandler}
            placeholder="enter password"
            name="password"
            className="bg-richblack-800 w-full rounded-[0.5rem] p-[12px] border-b-1 border-b-white"
          />

          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-5 bottom-9 text-2xl"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>

          <Link to="/forget-password">
            <p className="text-right text-[0.85rem] leading-[1.375rem] text-custom-text-2 mt-1">
              Forget Password?
            </p>
          </Link>
        </label>

        <button className="w-full bg-amber-300 py-[8px] rounded-[8px] text-black text-md mt-6 font-bold cursor-pointer">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
