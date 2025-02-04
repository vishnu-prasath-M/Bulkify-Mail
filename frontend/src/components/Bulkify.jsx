import logo from "../assets/images/logo1.png";

import { useState } from "react";
import axios from 'axios';
import * as XLSX from 'xlsx';
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaUserCog } from "react-icons/fa";
import Navbar from "./Navabar";
import Footer from "./Footer";

function Bulkify() {
  const [isVisible, setIsVisisble] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPassword, setSenderPassword] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Only allow one file at a time
  });

  const handleFileChange = (evt) => {
    const selectedFile = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = function (evt) {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const emailList = XLSX.utils.sheet_to_json(sheet, { header: 'A' });
      const totalemailList = emailList.map(function (item) {
        return item.A;
      });
      setEmailList(totalemailList);
    };
    setFile(selectedFile);
  };

  const handleshow = () => {
    setIsVisisble(!isVisible);
  };

  const [status, setStatus] = useState(false);

  function handlemsg(evt) {
    setMsg(evt.target.value);
  }

  function send() {
    setStatus(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendmail, { 
      msg: msg, 
      emailList: emailList,
      senderEmail: senderEmail,
      senderPassword: senderPassword
    }`).then(function (data) {
      if (data.data === true) {
        alert("Send Successfully");
        setStatus(false);
      } else {
        alert("Failed");
      }
    });
  }

  return (
    <div>
     <Navbar />

      {/* Upload Section */}
      <div className="bg-[url('../src/assets/images/bgban2.png')] h-screen bg-cover w-full items-center justify-center flex">
        <div className="flex flex-col items-center gap-5 mt-16 w-fit p-10 shadow-md rounded-xl backdrop-blur-lg">
          {/* drag and drop section */}
          <div
            {...getRootProps()}
            className="border-4 border-dashed border-gray-300 p-10 text-center cursor-pointer"
          >
            <input {...getInputProps()} onChange={handleFileChange} />
            <p className="text-xl">Drag and drop a file here</p>
            <p>or</p>
            <p className="text-blue-600">click to select one</p>
          </div>

          {/* Display selected file */}
          {file && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Selected File:</h3>
              <p>{file.name}</p>
              <p className="text-lg font-semibold">Total Emails :{emailList.length}</p>
            </div>
          )}

          {/* Sender Email and Password */}
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Sender Email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Sender Password"
              value={senderPassword}
              onChange={(e) => setSenderPassword(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          {/* Text Area */}
          <div>
            <textarea
              className="bg-white border p-10 px-20 rounded-sm shadow-md"
              placeholder="Enter The Email Text..."
              onChange={handlemsg}
            ></textarea>
          </div>

          {/* buttons */}
          <div className="flex gap-28">
            <button className=" border border-gray-400 p-2 rounded px-5 hover:bg-blue-700 hover:text-white">Cancel</button>
            <button className="bg-blue-500 p-2 px-5 rounded border-blue-500 border hover:bg-blue-700 text-white" onClick={send}>
              {status ? "Sending.." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* footer section */}
      <Footer />
    </div>
  );
}

export default Bulkify;