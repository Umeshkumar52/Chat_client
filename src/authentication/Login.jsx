import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "../components/GoogleAuth";
import SignInSchema from "../zodSchemas/SignInSchema";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoging } = useSelector((state) => state.auth);
  const [validationError, setValidationError] = useState();
  const [loginData, setloginData] = useState({
    Email: "",
    Password: "",
  });
  async function loginDetail(event) {
    const { name, value } = event.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  }
  async function onLogin(event) {
    event.preventDefault();
    const validate = SignInSchema.safeParse(loginData);
    if (validate.success) {
      const response = await dispatch(
        login({
          Email: validate.data.Email,
          Password: validate.data.Password,
        })
      );
      if (response.payload) {
        navigate("/");
      }
    } else {
      const formated = validate.error.format();
      setValidationError({
        Email: formated?.Email?._errors[0],
        Password: formated?.Password?._errors[0],
      });
    }
  }
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center py-6 px-2">
      <form
        onSubmit={onLogin}
        className="w-full bg-white/95 text-slate-700 shadow-2xl max-w-[35rem] flex flex-col items-center justify-center rounded-lg lg:p-10 p-3 gap-5"
      >
        <h1 className="font-semibold text-3xl text-indigo-600">Login</h1>
        <div className="w-full flex flex-col gap-4">
          <div>
            <input
              type="Email"
              onChange={loginDetail}
              name="Email"
              value={loginData.Email}
              placeholder="Enter E-mail or Phone..."
              className="w-full border-2 p-3 rounded-lg outline-none"
            />
            <h1 className="h-4 text-red-600 font-semibold">
              {validationError?.Email}
            </h1>
          </div>
          <div className="flex w-full flex-col gap-2">
            <input
              type="text"
              onChange={loginDetail}
              name="Password"
              value={loginData.Password}
              placeholder="Enter your Password..."
              className="w-full border-2 outline-none p-3 rounded-lg"
            />
            <h1 className="h-4 text-red-600 font-semibold">
              {validationError?.Password}
            </h1>
            <Link
              to="/forget-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forget password
            </Link>
          </div>
          <button className=" w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 text-2xl font-semibold rounded">
            {isLoging ? "Loaging..." : "Login"}
          </button>
          <p className="text-base font-semi-bold">
            <span>I have not a account ?</span>{" "}
            <Link
              to="/sign-up"
              className="text-indigo-600 hover:text-indigo-500"
            >
              register
            </Link>
          </p>
          <GoogleAuth />
        </div>
      </form>
      {isLoging && <Loader />}
      <ToastContainer/>
    </div>
  );
}
