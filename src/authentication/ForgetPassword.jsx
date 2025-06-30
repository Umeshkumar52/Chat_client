import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../reducers/authReducer";
import LoadingSpinner from "../components/LoadingSpinner";
import ResetLink from '../components/ResetLink'
export default function ForgetPassword() {
  const dispatch = useDispatch();
  const [Email_phone, setEmail_phone] = useState("");
  const [reset_link_status, setResetLinkStatus] = useState(false);
  const [mailInProgress, setMailInProgress] = useState(false);
  async function forgetPasswordHandler(event) {
    event.preventDefault();
    setMailInProgress(prev=>!prev);
    const response = await dispatch(forgetPassword({ Email: Email_phone }));
    if (response?.payload?.data?.success) {
      setEmail_phone("")
      setMailInProgress(prev=>!prev);
      setResetLinkStatus(prev=>!prev);
    }else{
      setMailInProgress(false)
    }
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center px-2 items-center">
      {reset_link_status?
       <ResetLink forgetPasswordHandler={forgetPasswordHandler}/>:
        <div className="shadow-lg rounded-xl p-4 md:p-10 py-14  w-full max-w-[30rem] flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold">Forget Password</h1>
          </div>
          <form onSubmit={forgetPasswordHandler} className="space-y-8">
            <div className="flex flex-col">
              <label
                htmlFor="Email-Phone"
                aria-required
                className="text-lg font-medium"
              >
                Email/Phone <span className="text-red-600">*</span>
              </label>
              <input
              value={Email_phone}
                onChange={(event) => setEmail_phone(event.target.value)}
                required
                type="text"
                className="text-lg p-2 rounded-lg outline-none border-2"
                name="Email-Phone"
                placeholder="Enter Email or Phone"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium p-2 rounded-lg"
            >
              Forget Password
            </button>
          </form>
        </div>}

        {mailInProgress && <LoadingSpinner />}
    </div>
  );
}
