import { IoIosArrowBack } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {ToastContainer } from "react-toastify";
export default function ResetLink(forgetPasswordHandler) {
  return (
    <div className="bg-white fixed top-0 w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-[30rem] flex flex-col items-center gap-8 px-2">
        <MdEmail className="text-8xl" />
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl font-semibold">Check your email!</h1>
          <h4>
            Thanks! We’ve sent you an email with a link to verify your account.
            Please check your inbox
          </h4>
        </div>
        <div className="flex flex-col gap-3 items-center text-lg">
          <a href="mailto:someone@example.com">
            <button className="bg-indigo-600 py-2 px-6 rounded-lg text-white">
              Open email inbox
            </button>
          </a>
          <button
            onClick={forgetPasswordHandler}
            className=" flex items-center hover:text-yellow-800 text-lg"
          >
            <IoIosArrowBack /> Resend Email
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
