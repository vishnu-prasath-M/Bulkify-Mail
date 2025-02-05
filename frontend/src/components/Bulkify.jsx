import logo from "../assets/images/logo1.png";
import { useState, useCallback } from "react";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useDropzone } from "react-dropzone";
import Navbar from "./Navabar";
import Footer from "./Footer";

function Bulkify() {
  const [isVisible, setIsVisible] = useState(false); // Fixed typo
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPassword, setSenderPassword] = useState("");
  const [status, setStatus] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
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
      const emails = XLSX.utils.sheet_to_json(sheet, { header: 'A' }).map(item => item.A);
      setEmailList(emails);
    };
    setFile(selectedFile);
  };

  function handleMsg(evt) {
    setMsg(evt.target.value);
  }

  function resetForm() {
    setMsg("");
    setFile(null);
    setEmailList([]);
    setSenderEmail("");
    setSenderPassword("");
    setStatus(false);
  }


  function send() {
    if (!senderEmail || !senderPassword || emailList.length === 0 || !msg) {
      alert("All fields are required.");
      return;
    }

    setStatus(true);

    axios.post(`${process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '')}/sendmail`, {

      msg,
      emailList,
      senderEmail,
      senderPassword
    })
      .then((response) => {
        if (response.data === true) {
          alert("Emails sent successfully!");
        } else {
          alert("Failed to send emails.");
        }
      })
      .catch((error) => {
        console.error("❌ Error sending emails:", error.response ? error.response.data : error.message);
        alert("An error occurred while sending emails. Check console for details.");
      })
      .finally(() => {
        setStatus(false);
      });
  }

  return (
    <div>
      <Navbar />

      {/* Upload Section */}
      <div className="bg-[url('../src/assets/images/bgban2.png')] h-screen bg-cover w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-5 mt-16 w-fit p-10 shadow-md rounded-xl backdrop-blur-lg">
          {/* Drag & Drop Section */}
          <div {...getRootProps()} className="border-4 border-dashed border-gray-300 p-10 text-center cursor-pointer">
            <input {...getInputProps()} onChange={handleFileChange} />
            <p className="text-xl">Drag and drop a file here</p>
            <p>or</p>
            <p className="text-blue-600">Click to select one</p>
          </div>

          {/* Display selected file */}
          {file && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Selected File:</h3>
              <p>{file.name}</p>
              <p className="text-lg font-semibold">Total Emails: {emailList.length}</p>
            </div>
          )}

          {/* Sender Email & Password */}
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

          {/* Email Text Area */}
          <div>
            <textarea
              className="bg-white border p-10 px-20 rounded-sm shadow-md"
              placeholder="Enter The Email Text..."
              value={msg} 
              onChange={handleMsg}
            ></textarea>

          </div>

          {/* Buttons */}
          <div className="flex gap-28">
            <button onClick={resetForm} className="border border-gray-400 p-2 rounded px-5 hover:bg-blue-700 hover:text-white">
              Cancel
            </button>
            <button className="bg-blue-500 p-2 px-5 rounded border-blue-500 border hover:bg-blue-700 text-white" onClick={send}>
              {status ? "Sending.." : "Send"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Bulkify;
