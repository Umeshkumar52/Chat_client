import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newStory } from "../reducers/socialPostController";
export default function NewStory() {
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [blobUrl, setBlobUrl] = useState({
    type: "",
    url: "",
  });
  const inputReset = useRef();
  function inputResetHandler() {
    if (inputReset.current) {
      inputReset.current.value = "";
      inputReset.current.type = "text";
      inputReset.current.type = "file";
    }
  }
  function fileChangeHandler(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setBlobUrl({
        type: event.target.files[0].type,
        url: URL.createObjectURL(event.target.files[0]),
      });
    }
  }
  async function createPostHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("story", file);
    formData.append("_id", user._id);
    navigate(-1);
    const response = await dispatch(newStory(formData));
    inputResetHandler();
    setFile(null);
  }
  const inputFile = useRef(null);
  function fileTabHandler() {
    inputFile.current.click();
  }
  useEffect(() => {
    fileTabHandler();
  }, [file]);
  if (file) {
    if (!file.type.includes("video")) {
      alert("Only Video file are allowed");
    }
    document.getElementById("videoDiv").style.width = "100%";
  }
  function videoPlayer(){
    if(isPlaying){
      videoRef.current.pause()
      setIsPlaying(false)
    }else{
      videoRef.current.play()
      setIsPlaying(true)
    }
  }
  return (
    <div className="flex flex-col gap-6 h-[100vh]">
      <div className="flex items-center justify-between border-2 border-black px-4 py-2 ">
        <div className="flex items-center gap-4">
          <IoIosArrowBack onClick={() => navigate(-1)} className="text-3xl" />
          <h2 className="font-medium text-lg">Create Story</h2>
        </div>
        <button
              onClick={createPostHandler}
              className="bg-indigo-600 hover:bg-indigo-700 hover:ring-2 px-6 md:px-10 py-1 md:py-2 text-white md:text-lg font-semibold"
            >
              Share
            </button>
      </div>
        <div id="videoDiv" className="hiddenScrollBar relative overflow-y-scroll flex justify-center ">
          <input
            ref={inputFile}
            accept="video/*"
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
            id="file"
            name="file"
          />
          <video className='w-full md:max-w-[80vw] max-h-[80vh]' ref={videoRef} onClick={videoPlayer} autoPlay src={blobUrl.url} />
        </div>
    </div>
  );
}
