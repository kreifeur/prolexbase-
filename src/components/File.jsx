import React, { useState } from "react";
import axios from "axios";
import { FaPaperclip } from "react-icons/fa6";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlefile = () => {
    let inp = document.getElementById("inp");
    inp.click();
  };

  return (
    <div>
      <div className="flex gap-4 p-4"> 
        <button className="border px-2 py-1 bg-blue-500 text-white flex gap-2 items-center " onClick={handlefile}> <FaPaperclip /> upload file</button>
        <input
          className="hidden"
          id="inp"
          type="file"
          onChange={handleFileChange}
        />
        <button className="border px-2 py-1 bg-orange-500 text-white" onClick={handleUpload}>Add top Database</button>
      </div>
    </div>
  );
};

export default FileUpload;
